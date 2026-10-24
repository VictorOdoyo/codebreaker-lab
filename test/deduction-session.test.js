import test from 'node:test';
import assert from 'node:assert/strict';
import { DeductionSession } from '../src/deduction-session.js';
test('session changes are atomic on contradictory feedback and undoable', () => {
  const s = new DeductionSession({ length: 2, colors: 3 });
  assert(s.add([0, 0], { exact: 2, misplaced: 0 }).accepted);
  const h = s.state.history;
  h[0].guess[0] = 2;
  assert.equal(s.state.history[0].guess[0], 0);
  assert.equal(s.add([1, 1], { exact: 2, misplaced: 0 }).accepted, false);
  assert.equal(s.state.history.length, 1);
  assert.equal(s.undo().ids.length, 9);
});
