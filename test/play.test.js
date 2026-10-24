import test from 'node:test';
import assert from 'node:assert/strict';
import { createScorer } from '../src/scorer.js';
import { solveSecret } from '../src/play.js';
test('automatic deduction reaches the real secret and reports turn exhaustion', () => {
  const s = createScorer({ length: 3, colors: 3 }),
    r = solveSecret(s, [2, 1, 0]);
  assert.equal(r.status, 'solved');
  assert.deepEqual(r.trace.at(-1).guess, [2, 1, 0]);
  for (const t of r.trace) assert(t.after <= t.before);
  assert.equal(solveSecret(s, [2, 1, 0], { maxTurns: 1 }).status, 'turn-limit');
  assert.equal(solveSecret(s, [2, 1, 0], { budget: 1 }).status, 'budget');
});
