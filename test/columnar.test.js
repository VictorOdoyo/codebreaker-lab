import test from 'node:test';
import assert from 'node:assert/strict';
import { columnar, columnKey } from '../src/columnar.js';
test('columnar transposition respects ragged columns and stable duplicate keys', () => {
  assert.deepEqual(columnKey('BALLOON'), [1, 0, 2, 3, 6, 4, 5]);
  assert.equal(columnar('ABCDEFGHIJ', [2, 0, 1]), 'CFIADGJBEH');
  for (let n = 0; n < 30; n++) {
    const s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ🙂!'.slice(0, n);
    assert.equal(columnar(columnar(s, [3, 1, 0, 2]), [3, 1, 0, 2], true), s);
  }
  assert.throws(() => columnar('abc', [0, 0]));
});
