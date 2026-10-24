import assert from 'node:assert/strict';import {mkdirSync,writeFileSync} from 'node:fs';
import {createScorer,auditPolicy,compareStrategies,caesar,affine,vigenere,columnar,railFence,searchCaesar,searchAffine,searchVigenere,searchColumnar,searchRailFence} from '../src/index.js';
import {MESSAGE} from '../src/challenges.js';
const started=performance.now(),policy=auditPolicy(createScorer());assert.equal(policy.status,'complete');assert.equal(policy.solved,1296);assert.equal(policy.maxDepth,5);
const paired=compareStrategies({length:4,colors:6},{seed:2026,secrets:30});for(const r of paired.rows)assert.equal(r.solved,30);
const recoveries=[];for(const key of [0,3,11,17,25]){assert.equal(searchCaesar(caesar(MESSAGE,key))[0].key,key);recoveries.push({kind:'caesar',key});}
for(const key of [{a:5,b:8},{a:7,b:3},{a:25,b:25}]){assert.deepEqual(searchAffine(affine(MESSAGE,key.a,key.b))[0].key,key);recoveries.push({kind:'affine',key});}
for(const key of ['RIVER','KEY','LEMON']){assert.equal(searchVigenere(vigenere(MESSAGE,key),{periods:[key.length]}) .rows[0].key,key);recoveries.push({kind:'vigenere-known-period',key});}
for(const key of [[2,0,3,1],[1,0,2],[4,2,0,3,1]]){const p=MESSAGE.replace(/[^A-Z]/g,'');assert.deepEqual(searchColumnar(columnar(p,key),{width:key.length}).rows[0].key,key);recoveries.push({kind:'columnar-known-width',key});}
for(const rails of [2,3,5]){assert.equal(searchRailFence(railFence(MESSAGE,rails))[0].rails,rails);recoveries.push({kind:'rail-fence',rails});}
const report={status:'passed',elapsedMs:performance.now()-started,policy:{...policy,nodes:policy.nodes.length},paired:{seed:paired.seed,rows:paired.rows.map(({runs,...r})=>r)},recoveries};const output=new URL('../results/',import.meta.url);mkdirSync(output,{recursive:true});writeFileSync(new URL('benchmark.json',output),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
