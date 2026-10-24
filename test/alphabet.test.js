import test from 'node:test';
import assert from 'node:assert/strict';
import { letters, indices, mod, transform } from '../src/alphabet.js';
test('ASCII normalization and transforms preserve formatting and case', () => {
  assert.equal(letters('A b!é1'), 'AB');
  assert.deepEqual(indices('Za'), [25, 0]);
  assert.equal(mod(-27), 25);
  assert.equal(
    transform('Az, b!', (x) => mod(x + 1)),
    'Ba, c!',
  );
  assert.throws(() => transform('x', () => 26));
});
