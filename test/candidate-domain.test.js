import test from 'node:test';
import assert from 'node:assert/strict';
import { createScorer, rankGuesses, marginals, partition, constrain } from '../src/index.js';
test('candidate APIs reject duplicates out-of-domain ids and oversized arrays', () => {
  const s = createScorer({ length: 2, colors: 2 });
  for (const ids of [[0, 0], [-1], [4], [NaN], null])
    for (const fn of [
      () => rankGuesses(s, ids),
      () => marginals(s, ids),
      () => partition(s, ids, [0, 0]),
      () => constrain(s, ids),
    ])
      assert.throws(fn);
});
