import test from 'node:test';
import assert from 'node:assert/strict';
import {decodeSession,encodeSession} from '../src/sessions.js';
test('versioned session imports validate and detach every transcript row',()=>{const state={rules:{length:2,colors:3},history:[],strategy:'entropy',pool:'sample'},decoded=decodeSession(encodeSession(state));assert.equal(decoded.rules.size,9);assert.equal(decoded.strategy,'entropy');assert.throws(()=>decodeSession('{"version":2}'));assert.throws(()=>decodeSession({version:1,kind:'deduction',rules:{},history:[],strategy:'x'}));});