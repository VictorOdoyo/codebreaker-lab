import test from 'node:test';
import assert from 'node:assert/strict';
import { chiSquare } from '../src/chi-square.js';
test('chi-square matches a uniform hand example and empty input', () => {
  assert.equal(chiSquare(''), 0);
  assert(Math.abs(chiSquare('AAAA', Array(26).fill(1 / 26)) - 100) < 1e-10);
  assert.throws(() => chiSquare('ABC', [1]));
});
