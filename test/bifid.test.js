import test from 'node:test';
import assert from 'node:assert/strict';
import {bifid} from '../src/bifid.js';
test('Bifid fractionation handles partial periods and keyed squares',()=>{for(let p=1;p<=12;p++)for(const s of ['','A','DEFENDTHEEASTWALLOFTHECASTLE'])assert.equal(bifid(bifid(s,'CIPHER',p),'CIPHER',p,true),s);assert.equal(bifid('ABC','',1),'ABC');});