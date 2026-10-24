import test from 'node:test';
import assert from 'node:assert/strict';
import { searchSubstitution } from '../src/substitution-search.js';
import { substitution, keywordKey } from '../src/substitution.js';
test('annealing replays seed and honors fixed mappings without claiming optimality', () => {
  const p = 'THE OBSERVATORY STOOD ABOVE THE RIVER WHERE THE RAILWAY TURNED',
    key = keywordKey('SECRET'),
    cipher = substitution(p, key),
    options = { iterations: 120, restarts: 2, seed: 12, mapping: { T: key[19], H: key[7] } };
  const a = searchSubstitution(cipher, options),
    b = searchSubstitution(cipher, options);
  assert.deepEqual(a, b);
  assert.equal(a.key[19], key[19]);
  assert.equal(a.key[7], key[7]);
  assert(a.score >= a.trace[0].best);
  assert.equal(a.proposals, 240);
  assert.equal(a.complete, false);
  assert.throws(() => searchSubstitution(cipher, { iterations: 20000, restarts: 20 }));
});
