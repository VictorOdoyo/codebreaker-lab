import test from 'node:test';import assert from 'node:assert/strict';
import {searchSubstitution,searchVigenere} from '../src/index.js';
test('stochastic searches reject empty and excessive work before scoring',()=>{assert.throws(()=>searchSubstitution('123'));assert.throws(()=>searchSubstitution('A'.repeat(5000),{iterations:10000,restarts:2}));assert.throws(()=>searchVigenere('A'.repeat(5001)));});
