import test from 'node:test';
import assert from 'node:assert/strict';
import {coincidence,textEntropy,friedmanEstimate} from '../src/coincidence.js';
test('coincidence counts ordered equal-letter pairs and short samples safely',()=>{assert.equal(coincidence('AABB'),1/3);assert.equal(coincidence('AAAA'),1);assert.equal(coincidence('A'),0);assert.equal(textEntropy('ABAB'),1);assert.equal(textEntropy(''),0);assert.equal(friedmanEstimate('A').estimate,null);});