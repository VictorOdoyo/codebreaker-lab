import test from 'node:test';
import assert from 'node:assert/strict';
import { polybius, squareKey } from '../src/polybius.js';
test('Polybius uses a keyed 25-letter I/J square', () => {
  assert.equal(squareKey().length, 25);
  assert.equal(polybius('ABC'), '11 12 13');
  assert.equal(polybius(polybius('JIG SAW', 'KEY'), 'KEY', true), 'IIGSAW');
  assert.throws(() => polybius('66', '', true));
});
