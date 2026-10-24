import test from 'node:test';
import assert from 'node:assert/strict';
import {analyze} from '../src/analysis.js';
test('analysis reports preserve normalization and finite serializable diagnostics',()=>{const a=analyze('Abc ABC!');assert.equal(a.frequency.length,6);assert.equal(a.trigrams[0].gram,'ABC');assert.equal(a.periods.length,16);assert.equal(a.friedman.estimate,null);assert.equal(JSON.parse(JSON.stringify(a)).frequency.length,6);assert.throws(()=>analyze('x'.repeat(20001)));});