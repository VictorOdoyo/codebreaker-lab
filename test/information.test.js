import test from 'node:test';
import assert from 'node:assert/strict';
import {information,posteriorBits} from '../src/information.js';
test('entropy and expected survivors match hand-computed partitions',()=>{assert.deepEqual(information([2,2]),{entropy:1,expectedRemaining:2,worstCase:2,branches:2,collision:.5});assert.equal(information([4]).entropy,0);assert.equal(information([]).worstCase,0);assert.equal(posteriorBits(8),3);});