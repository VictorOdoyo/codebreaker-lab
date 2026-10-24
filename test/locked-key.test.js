import test from 'node:test';
import assert from 'node:assert/strict';
import { lockedKey } from '../src/locked-key.js';
import { ALPHABET } from '../src/alphabet.js';
test('crib locks preserve a permutation and expose only mutable positions', () => {
  const r = lockedKey(ALPHABET, { A: 'Z', Z: 'A', E: 'T' });
  assert.equal(r.key[0], 'Z');
  assert.equal(r.key[25], 'A');
  assert.equal(r.key[4], 'T');
  assert.equal(new Set(r.key).size, 26);
  assert(!r.mutable.includes(0));
  assert.throws(() => lockedKey(ALPHABET, { A: 'X', B: 'X' }));
});
