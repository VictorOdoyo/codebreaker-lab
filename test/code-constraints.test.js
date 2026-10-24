import test from 'node:test';
import assert from 'node:assert/strict';
import { createScorer } from '../src/scorer.js';
import { constrain } from '../src/code-constraints.js';
test('side constraints enforce fixed positions and symbol multiplicities', () => {
  const s = createScorer({ length: 3, colors: 3 }),
    ids = s.codes.map((_, i) => i),
    r = constrain(s, ids, {
      fixed: { 0: 1 },
      forbidden: { 1: [1] },
      minCounts: { 2: 1 },
      maxCounts: { 1: 1 },
    });
  assert.equal(r.length, 3);
  for (const id of r) {
    const c = s.codes[id];
    assert.equal(c[0], 1);
    assert.notEqual(c[1], 1);
    assert(c.includes(2));
  }
  assert.throws(() => constrain(s, ids, { fixed: { 3: 0 } }));
});
