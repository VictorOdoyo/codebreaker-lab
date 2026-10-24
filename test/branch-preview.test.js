import test from 'node:test';
import assert from 'node:assert/strict';
import { createScorer } from '../src/scorer.js';
import { branchPreview } from '../src/branch-preview.js';
test('branch lookahead distinguishes winning replies from continued search', () => {
  const s = createScorer({ length: 2, colors: 2 }),
    r = branchPreview(s, [0, 1, 2, 3], [0, 0]);
  assert.equal(r.totalBranches, 3);
  assert.equal(r.rows.find((b) => b.response.exact === 2).next, null);
  assert(r.rows.find((b) => b.count === 2).next.rows.length);
});
