import test from 'node:test';
import assert from 'node:assert/strict';
import { createScorer } from '../src/scorer.js';
import { rankGuesses } from '../src/ranking.js';
test('minimax ranks the canonical opening and reports incomplete budgets honestly', () => {
  const s = createScorer(),
    ids = s.codes.map((_, i) => i),
    r = rankGuesses(s, ids);
  assert.deepEqual(r.rows[0].guess, [0, 0, 1, 1]);
  assert.equal(r.rows[0].worstCase, 256);
  assert.equal(r.exactGlobal, true);
  const tiny = rankGuesses(s, ids, { budget: 1 });
  assert.equal(tiny.rows.length, 0);
  assert.equal(tiny.complete, false);
  assert.equal(rankGuesses(s, ids, { pool: 'sample', sampleSize: 5 }).exactGlobal, false);
});
