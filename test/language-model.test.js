import test from 'node:test';
import assert from 'node:assert/strict';
import { trainModel, languageScore, englishModel } from '../src/language-model.js';
test('smoothed backoff model scores unseen text finitely and prefers trained structure', () => {
  const m = trainModel('ABABABABABAB', { order: 3 });
  assert(languageScore('ABABAB', m) > languageScore('ZZZZZZ', m));
  assert(Number.isFinite(languageScore('XYZ', m)));
  assert.equal(languageScore('', m), 0);
  assert(englishModel().characters > 4000);
  assert.throws(() => trainModel('X', { order: 4 }));
});
