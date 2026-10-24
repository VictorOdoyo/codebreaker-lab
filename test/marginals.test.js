import test from 'node:test';
import assert from 'node:assert/strict';
import { createScorer } from '../src/scorer.js';
import { marginals } from '../src/marginals.js';
test('posterior marginals identify forced positions and symbol presence', () => {
  const s = createScorer({ length: 2, colors: 2 });
  const m = marginals(s, [0, 1]);
  assert.deepEqual(m.forced, [0, -1]);
  assert.deepEqual(m.position, [
    [1, 0],
    [0.5, 0.5],
  ]);
  assert.deepEqual(m.presence, [1, 0.5]);
  assert.deepEqual(marginals(s, []).forced, [-1, -1]);
});
