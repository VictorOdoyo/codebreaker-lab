import test from 'node:test';
import assert from 'node:assert/strict';
import { random, shuffle, sample } from '../src/rng.js';
test('seeded streams and sampling replay without mutating inputs', () => {
  const a = random(0),
    b = random(0);
  assert.deepEqual(Array.from({ length: 100 }, a), Array.from({ length: 100 }, b));
  const v = [1, 2, 3, 4, 5];
  assert.deepEqual(shuffle(v, random(42)).sort(), v);
  assert.equal(new Set(sample(v, 3, random(4))).size, 3);
  assert.throws(() => random(-1));
});
