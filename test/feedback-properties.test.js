import test from 'node:test';
import assert from 'node:assert/strict';
import { feedback, codeSpace, createScorer, rankGuesses, replay } from '../src/index.js';
test('feedback is symmetric and invariant under symbol relabeling on exhaustive small spaces', () => {
  const r = { length: 3, colors: 3 },
    codes = codeSpace(r),
    p = [2, 0, 1];
  for (const a of codes)
    for (const b of codes) {
      const f = feedback(a, b, r);
      assert.deepEqual(f, feedback(b, a, r));
      assert.deepEqual(
        f,
        feedback(
          a.map((x) => p[x]),
          b.map((x) => p[x]),
          r,
        ),
      );
      assert(f.exact + f.misplaced <= 3);
    }
});
test('every exact response identifies its code even when repetitions are disabled', () => {
  const s = createScorer({ length: 3, colors: 4, repeats: false });
  for (const guess of s.codes)
    assert.equal(replay(s, [{ guess, response: { exact: 3, misplaced: 0 } }]).ids.length, 1);
});
test('all ranking objectives retain candidate preference on tied single-secret states', () => {
  const s = createScorer({ length: 2, colors: 3 });
  for (const strategy of ['minimax', 'entropy', 'expected'])
    for (let i = 0; i < s.codes.length; i++)
      assert.equal(rankGuesses(s, [i], { strategy }).rows[0].id, i);
});
