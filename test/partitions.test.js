import test from 'node:test';
import assert from 'node:assert/strict';
import {createScorer} from '../src/scorer.js';
import {partition} from '../src/partitions.js';
test('feedback branches partition the uniform posterior exactly',()=>{const s=createScorer(),ids=s.codes.map((_,i)=>i),p=partition(s,ids,[0,0,1,1]);assert.equal(p.reduce((a,b)=>a+b.count,0),1296);assert.equal(new Set(p.flatMap(b=>b.ids)).size,1296);assert(Math.abs(p.reduce((a,b)=>a+b.probability,0)-1)<1e-12);assert.equal(p.find(b=>b.response.exact===4).count,1);});