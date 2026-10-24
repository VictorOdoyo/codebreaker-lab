import test from 'node:test';
import assert from 'node:assert/strict';
import {ngrams} from '../src/ngrams.js';
test('overlapping ngrams retain normalized letter offsets',()=>{const r=ngrams('AB A BA',2);assert.deepEqual(r[0],{gram:'AB',count:2,positions:[0,2]});assert.equal(ngrams('A',3).length,0);assert.throws(()=>ngrams('x',0));});