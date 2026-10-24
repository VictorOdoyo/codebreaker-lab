import test from 'node:test';
import assert from 'node:assert/strict';
import {createScorer} from '../src/scorer.js';
import {auditPolicy} from '../src/policy.js';
test('policy audit covers every secret without per-secret re-solving',()=>{const s=createScorer({length:3,colors:3}),r=auditPolicy(s);assert.equal(r.status,'complete');assert.equal(r.solved,27);assert(r.maxDepth<=4);assert.equal(Object.values(r.histogram).reduce((a,b)=>a+b,0),27);assert.equal(auditPolicy(s,{maxNodes:1}).status,'node-budget');});