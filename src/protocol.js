import { createScorer } from './scorer.js';
import { replay } from './candidates.js';
import { rankGuesses } from './ranking.js';
import { partition } from './partitions.js';
import { marginals } from './marginals.js';
import { evidence } from './evidence.js';
import { auditPolicy } from './policy.js';
import { compareStrategies } from './experiments.js';
import { analyze } from './analysis.js';
import { searchCaesar, searchAffine } from './caesar-search.js';
import { searchVigenere } from './vigenere-search.js';
import { searchSubstitution } from './substitution-search.js';
import { searchColumnar, searchRailFence } from './transposition-search.js';
import { text, choice } from './validate.js';
export function createHandler() {
  let scorer, lastRules;
  return function handle(request) {
    if (!request || typeof request !== 'object') throw new TypeError('Invalid request');
    const { action, input = {}, options = {} } = request;
    choice(action, ['deduction', 'audit', 'compare', 'analyze', 'search']);
    if (['deduction', 'audit'].includes(action)) {
      const key = JSON.stringify(input.rules ?? {});
      if (key !== lastRules) {
        scorer = createScorer(input.rules);
        lastRules = key;
      }
    }
    if (action === 'deduction') {
      const state = replay(scorer, input.history ?? []),
        ranking = rankGuesses(scorer, state.ids, options),
        best = ranking.rows[0];
      return {
        state,
        ranking,
        candidates: state.ids.map((i) => scorer.codes[i]),
        marginals: marginals(scorer, state.ids),
        evidence: evidence(scorer, input.history ?? []),
        branches: best
          ? partition(scorer, state.ids, best.guess).map(({ ids, ...rest }) => rest)
          : [],
      };
    }
    if (action === 'audit') return auditPolicy(scorer, options);
    if (action === 'compare') return compareStrategies(input.rules, options);
    text(input.text, 5000);
    if (action === 'analyze') return analyze(input.text);
    choice(input.kind, ['caesar', 'affine', 'vigenere', 'substitution', 'columnar', 'rail-fence']);
    let result;
    switch (input.kind) {
      case 'caesar':
        result = { rows: searchCaesar(input.text), complete: true, evaluated: 26 };
        break;
      case 'affine':
        result = { rows: searchAffine(input.text), complete: true, evaluated: 312 };
        break;
      case 'vigenere':
        result = searchVigenere(input.text, options);
        break;
      case 'substitution': {
        const r = searchSubstitution(input.text, options);
        result = { rows: [r], ...r };
        break;
      }
      case 'columnar':
        result = searchColumnar(input.text, options);
        break;
      case 'rail-fence':
        result = {
          rows: searchRailFence(input.text, options),
          complete: true,
          evaluated: (options.maxRails ?? 12) - 1,
        };
        break;
    }
    return { ...result, analysis: analyze(input.text) };
  };
}
