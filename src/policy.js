import { rankGuesses } from './ranking.js';
import { partitionIds } from './partitions.js';
import { decodeFeedback } from './feedback.js';
import { integer } from './validate.js';
export function auditPolicy(scorer, { maxNodes = 20000, ...options } = {}) {
  integer(maxNodes, 1, 100000, 'node budget');
  const queue = [{ ids: scorer.codes.map((_, i) => i), depth: 1 }],
    histogram = {},
    nodes = [];
  let solved = 0,
    maxDepth = 0,
    totalGuesses = 0,
    operations = 0,
    status = 'complete';
  for (let cursor = 0; cursor < queue.length; cursor++) {
    if (nodes.length >= maxNodes) {
      status = 'node-budget';
      break;
    }
    const { ids, depth } = queue[cursor],
      r = rankGuesses(scorer, ids, { ...options, limit: 1 });
    operations += r.operations;
    if (!r.complete || !r.rows.length) {
      status = 'ranking-budget';
      break;
    }
    const row = r.rows[0],
      buckets = partitionIds(scorer, ids, row.id);
    nodes.push({ depth, candidates: ids.length, guess: row.guess, worstCase: row.worstCase });
    for (const [k, members] of buckets) {
      if (decodeFeedback(k, scorer.rules.length).exact === scorer.rules.length) {
        solved += members.length;
        totalGuesses += depth * members.length;
        histogram[depth] = (histogram[depth] ?? 0) + members.length;
        maxDepth = Math.max(maxDepth, depth);
      } else {
        if (members.length === ids.length) throw new Error('Policy made no progress');
        queue.push({ ids: members, depth: depth + 1 });
      }
    }
  }
  return {
    status,
    solved,
    total: scorer.codes.length,
    maxDepth,
    mean: solved ? totalGuesses / solved : 0,
    histogram,
    nodes,
    operations,
    scope: options.pool ?? 'all',
  };
}
