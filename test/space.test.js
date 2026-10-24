import test from 'node:test';
import assert from 'node:assert/strict';
import {codeSpace,parseCode,codeKey} from '../src/space.js';
test('lexical code enumeration is complete and duplicate-free',()=>{const all=codeSpace();assert.equal(all.length,1296);assert.equal(new Set(all.map(codeKey)).size,1296);assert.deepEqual(all[0],[0,0,0,0]);assert.deepEqual(all.at(-1),[5,5,5,5]);assert.equal(codeSpace({length:3,colors:4,repeats:false}).length,24);assert.deepEqual(parseCode('0123'),[0,1,2,3]);assert.throws(()=>parseCode('01x3'));});