import test from 'node:test';
import assert from 'node:assert/strict';
import {permutations,factorial} from '../src/permutations.js';
test('permutation iterator is lazy lexical and factorial-complete',()=>{for(let n=2;n<=6;n++){const p=[...permutations(n)];assert.equal(p.length,factorial(n));assert.equal(new Set(p.map(x=>x.join(''))).size,p.length);assert.deepEqual(p[0],Array.from({length:n},(_,i)=>i));}assert.equal(factorial(0),1);});