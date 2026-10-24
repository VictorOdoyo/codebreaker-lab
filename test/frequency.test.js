import test from 'node:test';
import assert from 'node:assert/strict';
import { frequencies, frequencyKey, ENGLISH } from '../src/frequency.js';
test('letter histograms ignore punctuation and construct valid frequency keys', () => {
  const r = frequencies('AaB!');
  assert.equal(r.length, 3);
  assert.equal(r.counts[0], 2);
  assert.equal(r.rows[1].frequency, 1 / 3);
  assert.equal(frequencies('').rows[0].frequency, 0);
  assert.equal(new Set(frequencyKey('secret message')).size, 26);
  assert(Math.abs(ENGLISH.reduce((a, b) => a + b, 0) - 1) < 0.001);
});
