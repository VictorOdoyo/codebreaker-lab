import test from 'node:test';
import assert from 'node:assert/strict';
import { autokey } from '../src/autokey.js';
test('plaintext autokey extends its key from recovered plaintext', () => {
  assert.equal(autokey('ATTACKATDAWN', 'QUEENLY'), 'QNXEPVYTWTWP');
  assert.equal(autokey('QNXEPVYTWTWP', 'QUEENLY', true), 'ATTACKATDAWN');
  assert.equal(autokey(autokey('A b, C!', 'X'), 'X', true), 'A b, C!');
});
