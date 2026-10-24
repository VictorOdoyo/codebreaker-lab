import test from 'node:test';
import assert from 'node:assert/strict';
import {railFence} from '../src/rail-fence.js';
test('rail fence reconstructs uneven zigzags including unicode characters',()=>{assert.equal(railFence('WEAREDISCOVEREDFLEEATONCE',3),'WECRLTEERDSOEEFEAOCAIVDEN');for(let r=2;r<=10;r++)for(const s of ['','A','A🙂B, C!','abcdefghijklm'])assert.equal(railFence(railFence(s,r),r,true),s);});