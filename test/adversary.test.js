import test from 'node:test';
import assert from 'node:assert/strict';
import {createScorer} from '../src/scorer.js';
import {adversarialResponse} from '../src/adversary.js';
test('adaptive adversary always preserves a largest consistent branch',()=>{const s=createScorer({length:2,colors:3}),ids=s.codes.map((_,i)=>i),r=adversarialResponse(s,ids,[0,0]);assert.equal(r.count,4);assert.equal(r.response.exact,0);assert.equal(r.ids.length,4);assert.throws(()=>adversarialResponse(s,[],[0,0]));});