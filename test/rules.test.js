import test from 'node:test';
import assert from 'node:assert/strict';
import {rules,validateCode} from '../src/rules.js';
test('space cardinalities and code domains are bounded',()=>{assert.equal(rules().size,1296);assert.equal(rules({length:4,colors:6,repeats:false}).size,360);assert.throws(()=>rules({length:6,colors:10}));assert.throws(()=>rules({length:4,colors:2,repeats:false}));assert.throws(()=>validateCode([0,1,1,2],{repeats:false}));assert.throws(()=>rules({repeats:'yes'}));});