import test from 'node:test';
import assert from 'node:assert/strict';
import { searchCaesar, searchAffine } from '../src/caesar-search.js';
import { caesar } from '../src/caesar.js';
import { affine } from '../src/affine.js';
test('complete Caesar and affine searches recover a held-out prose sample', () => {
  const p =
    'The engineer compared the results before changing the design. Every measurement was written in the notebook so another student could repeat the experiment.';
  assert.equal(searchCaesar(caesar(p, 11))[0].key, 11);
  assert.deepEqual(searchAffine(affine(p, 7, 3))[0].key, { a: 7, b: 3 });
});
