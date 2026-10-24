import test from 'node:test';
import assert from 'node:assert/strict';
import { DEMO_HISTORY, CHALLENGES, MESSAGE } from '../src/challenges.js';
import { createScorer } from '../src/scorer.js';
import { replay } from '../src/candidates.js';
import { vigenere } from '../src/vigenere.js';
test('authored challenges are reproducible and demo history remains consistent', () => {
  const r = replay(createScorer(), DEMO_HISTORY);
  assert(r.ids.length > 1 && r.ids.length < 256);
  assert.equal(vigenere(CHALLENGES[0].ciphertext, CHALLENGES[0].solution, true), MESSAGE);
  assert.equal(CHALLENGES.length, 3);
});
