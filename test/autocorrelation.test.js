import test from 'node:test';
import assert from 'node:assert/strict';
import {autocorrelation} from '../src/autocorrelation.js';
test('shifted coincidence exposes periodic alignment without wrapping',()=>{const r=autocorrelation('ABCABCABC',5);assert.deepEqual(r[2],{lag:3,matches:6,pairs:6,rate:1});assert.equal(r[0].matches,0);assert.deepEqual(autocorrelation('A'),[]);});