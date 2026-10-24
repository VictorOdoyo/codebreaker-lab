import test from 'node:test';
import assert from 'node:assert/strict';
import {integer,finite,text,choice} from '../src/validate.js';
test('numeric and text boundaries reject malformed inputs',()=>{assert.equal(integer(2,2,6),2);for(const x of [NaN,Infinity,1.5,'2',null])assert.throws(()=>integer(x,2,6));assert.throws(()=>finite(Infinity));assert.throws(()=>finite(-1,0));assert.throws(()=>text({},20));assert.throws(()=>text('abc',2));assert.throws(()=>choice('x',['a']));});