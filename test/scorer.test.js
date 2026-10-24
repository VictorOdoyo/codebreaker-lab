import test from 'node:test';
import assert from 'node:assert/strict';
import {createScorer} from '../src/scorer.js';
import {scoreRaw,feedbackKey} from '../src/feedback.js';
test('lazy feedback rows agree with independent multiset scoring',()=>{const s=createScorer({length:3,colors:3});for(let a=0;a<s.codes.length;a++)for(let b=0;b<s.codes.length;b++)assert.equal(s.score(a,b),feedbackKey(scoreRaw(s.codes[a],s.codes[b],3),3));const n=s.evaluations;s.score(0,0);assert.equal(s.evaluations,n);s.clear();assert.equal(s.cachedRows,0);assert.throws(()=>s.score(-1,0));});