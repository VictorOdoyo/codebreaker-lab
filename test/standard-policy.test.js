import test from 'node:test';
import assert from 'node:assert/strict';
import { createScorer, auditPolicy } from '../src/index.js';
test('standard minimax policy solves every one of 1296 secrets within five turns', () => {
  const r = auditPolicy(createScorer());
  assert.equal(r.status, 'complete');
  assert.equal(r.solved, 1296);
  assert.equal(r.maxDepth, 5);
  assert.equal(
    Object.values(r.histogram).reduce((a, b) => a + b, 0),
    1296,
  );
  assert(r.nodes.every((n) => n.depth <= 5));
  assert(r.mean >= 4 && r.mean <= 5);
});
