import test from 'node:test';
import assert from 'node:assert/strict';
import { letters } from '../src/alphabet.js';
import { analyze, caesar } from '../src/index.js';
test('non-ASCII case expansions do not silently create analyzed letters', () => {
  assert.equal(letters('Straße ﬀ é İ abc'), 'STRAEABC');
  assert.equal(analyze('ßﬀ').frequency.length, 0);
  assert.equal(caesar('ßﬀ abc', 1), 'ßﬀ bcd');
});
