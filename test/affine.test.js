import test from 'node:test';
import assert from 'node:assert/strict';
import {affine,affineKeys} from '../src/affine.js';
test('affine cipher matches the classic vector across all 312 keys',()=>{assert.equal(affine('AFFINE CIPHER',5,8),'IHHWVC SWFRCP');assert.equal(affineKeys().length,312);for(const {a,b} of affineKeys())assert.equal(affine(affine('A mixed Test!',a,b),a,b,true),'A mixed Test!');assert.throws(()=>affine('X',2,1));});