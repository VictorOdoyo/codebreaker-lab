import test from 'node:test';
import assert from 'node:assert/strict';
import {vigenere} from '../src/vigenere.js';
test('polyalphabetic variants honor key advancement over letters only',()=>{assert.equal(vigenere('ATTACK AT DAWN','LEMON'),'LXFOPV EF RNHR');assert.equal(vigenere('LXFOPV EF RNHR','LEMON',true),'ATTACK AT DAWN');for(const variant of ['vigenere','beaufort','variant-beaufort'])assert.equal(vigenere(vigenere('Meet, at 9!','ABC',false,variant),'ABC',true,variant),'Meet, at 9!');assert.throws(()=>vigenere('abc','123'));});