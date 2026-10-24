import test from 'node:test';
import assert from 'node:assert/strict';
import { cribMappings, cribPlacements } from '../src/cribs.js';
test('crib placement enforces a bijection in both mapping directions', () => {
  assert.deepEqual(cribMappings('XYYZ', 'MEET').mapping, { M: 'X', E: 'Y', T: 'Z' });
  assert.equal(cribMappings('XYZW', 'MEET').consistent, false);
  assert.equal(cribMappings('XXXX', 'ABCD').consistent, false);
  assert.equal(cribPlacements('ABBCXYYZ', 'MEET').length, 2);
  assert.throws(() => cribMappings('ABC', 'TOOLONG'));
});
