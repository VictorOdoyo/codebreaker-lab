import test from 'node:test';
import assert from 'node:assert/strict';
import { searchColumnar, searchRailFence } from '../src/transposition-search.js';
import { columnar } from '../src/columnar.js';
import { railFence } from '../src/rail-fence.js';
test('bounded transposition searches recover controlled samples and expose truncation', () => {
  const p = 'THEKEEPEROPENEDTHENARROWWINDOWSANDCHECKEDTHEINSTRUMENTSBEFORETHEFIRSTTRAINARRIVED';
  assert.deepEqual(searchColumnar(columnar(p, [2, 0, 3, 1])).rows[0].key, [2, 0, 3, 1]);
  assert.equal(searchColumnar(p, { width: 5, budget: 3 }).complete, false);
  assert.equal(searchRailFence(railFence(p, 5))[0].rails, 5);
});
