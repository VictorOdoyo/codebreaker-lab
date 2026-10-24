import test from 'node:test';
import assert from 'node:assert/strict';
import { createScorer } from '../src/scorer.js';
import { replay, filterCandidates } from '../src/candidates.js';
test('candidate replay preserves the secret and monotone counts', () => {
  const s = createScorer();
  const h = [{ guess: [0, 0, 1, 1], response: { exact: 1, misplaced: 1 } }];
  const r = replay(s, h);
  assert(r.ids.length > 0 && r.ids.length < 1296);
  assert.deepEqual(r.trace, [1296, r.ids.length]);
  assert.equal(filterCandidates(s, r.ids, [0, 0, 1, 1], { exact: 0, misplaced: 0 }).length, 0);
  assert.throws(() => replay(s, new Array(101)));
});
