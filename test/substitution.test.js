import test from 'node:test';
import assert from 'node:assert/strict';
import {substitution,keywordKey,randomKey,substitutionKey} from '../src/substitution.js';
test('permutation substitution and keyword alphabets round-trip',()=>{const k=keywordKey('ZEBRAS');assert.equal(k.slice(0,6),'ZEBRAS');assert.equal(k.length,26);assert.equal(new Set(randomKey()).size,26);assert.equal(substitution(substitution('Hello, World!',k),k,true),'Hello, World!');assert.throws(()=>substitutionKey('A'.repeat(26)));});