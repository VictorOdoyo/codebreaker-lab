import test from 'node:test';
import assert from 'node:assert/strict';
import {gcd,inverse} from '../src/number-theory.js';
test('extended Euclid finds only valid modular inverses',()=>{assert.equal(gcd(18,26),2);for(let a=1;a<26;a++){if(gcd(a,26)===1)assert.equal(a*inverse(a)%26,1);else assert.throws(()=>inverse(a));}assert.equal(inverse(-5),5);});