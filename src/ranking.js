import { candidateDomain } from './candidate-domain.js';
import { integer, choice } from './validate.js';
import { partitionIds } from './partitions.js';
import { information } from './information.js';
import { random, sample } from './rng.js';
export function rankGuesses(
  scorer,
  ids,
  {
    strategy = 'minimax',
    pool = 'all',
    sampleSize = 256,
    seed = 42,
    budget = 20000000,
    limit = 12,
  } = {},
) {
  candidateDomain(scorer, ids);
  choice(strategy, ['minimax', 'entropy', 'expected']);
  choice(pool, ['all', 'candidates', 'sample']);
  integer(budget, 1, 20000000, 'budget');
  integer(limit, 1, 100, 'limit');
  integer(sampleSize, 1, 4096, 'sample size');
  if (!ids.length) return { rows: [], complete: true, operations: 0, searched: 0, poolSize: 0 };
  const candidates = new Set(ids);
  let guesses = pool === 'candidates' ? [...ids] : scorer.codes.map((_, i) => i);
  if (pool === 'sample' && guesses.length > sampleSize)
    guesses = sample(guesses, sampleSize, random(seed)).sort((a, b) => a - b);
  let operations = 0;
  const rows = [];
  for (const g of guesses) {
    if (operations + ids.length > budget) break;
    const buckets = partitionIds(scorer, ids, g),
      metrics = information([...buckets.values()].map((x) => x.length));
    rows.push({ id: g, guess: scorer.codes[g], candidate: candidates.has(g), ...metrics });
    operations += ids.length;
  }
  const metric = (r) =>
    strategy === 'minimax'
      ? r.worstCase
      : strategy === 'entropy'
        ? -r.entropy
        : r.expectedRemaining;
  rows.sort(
    (a, b) => metric(a) - metric(b) || Number(b.candidate) - Number(a.candidate) || a.id - b.id,
  );
  return {
    rows: rows.slice(0, limit),
    complete: rows.length === guesses.length,
    operations,
    searched: rows.length,
    poolSize: guesses.length,
    exactGlobal: pool === 'all' && rows.length === guesses.length,
  };
}
