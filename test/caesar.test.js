import test from 'node:test';
import assert from 'node:assert/strict';
import { caesar, atbash } from '../src/caesar.js';
test('Caesar and Atbash match known vectors and preserve formatting', () => {
  assert.equal(caesar('Attack at Dawn!', 3), 'Dwwdfn dw Gdzq!');
  assert.equal(caesar('Dwwdfn dw Gdzq!', 3, true), 'Attack at Dawn!');
  assert.equal(atbash('Abc Zyx!'), 'Zyx Abc!');
  for (let k = -26; k <= 26; k++) assert.equal(caesar(caesar('Zebra', k), k, true), 'Zebra');
});
