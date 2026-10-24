import test from 'node:test';
import assert from 'node:assert/strict';
import {searchVigenere,primitiveKey} from '../src/vigenere-search.js';
import {vigenere} from '../src/vigenere.js';
import {CORPUS} from '../src/corpus.js';
test('period beam recovery returns primitive keys and deterministic candidates',()=>{assert.equal(primitiveKey('ABCABC'),'ABC');const p=CORPUS.slice(0,1500),r=searchVigenere(vigenere(p,'RIVER'),{periods:[5],perColumn:3});assert.equal(r.rows[0].key,'RIVER');assert.equal(r.complete,false);assert(r.evaluated<=128);assert.throws(()=>searchVigenere('A',{periods:[0]}));});