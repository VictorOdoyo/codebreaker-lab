import test from 'node:test';
import assert from 'node:assert/strict';
import {cipher,CIPHERS} from '../src/cipher-dispatch.js';
test('cipher dispatch exposes all supported algorithms and rejects unknown names',()=>{assert.equal(CIPHERS.length,12);assert.equal(cipher('caesar','ABC'),'DEF');assert.equal(cipher('vigenere','ATTACKATDAWN'),'LXFOPVEFRNHR');assert.throws(()=>cipher('unknown','ABC'));});