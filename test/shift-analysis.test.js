import test from 'node:test';
import assert from 'node:assert/strict';
import { shiftAnalysis } from '../src/shift-analysis.js';
import { caesar } from '../src/caesar.js';
test('shift analysis ranks the true Caesar key for a frequency-balanced sample', () => {
  const plain =
    'THE QUICK BROWN FOX DOES NOT ALWAYS JUMP OVER THE LAZY DOG BECAUSE THE WEATHER IS COLD AND THE FOREST IS QUIET THE OTHER ANIMALS ARE RESTING IN THEIR HOMES';
  const r = shiftAnalysis(caesar(plain, 17));
  assert.equal(r.length, 26);
  assert.equal(r[0].shift, 17);
});
