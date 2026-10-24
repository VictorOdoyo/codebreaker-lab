import test from 'node:test';
import assert from 'node:assert/strict';
import {feedback,feedbackKey,decodeFeedback} from '../src/feedback.js';
test('duplicate feedback counts shared multiset symbols only once',()=>{assert.deepEqual(feedback([1,1,2,2],[1,2,1,3]),{exact:1,misplaced:2});assert.deepEqual(feedback([0,0,0,0],[0,1,1,1]),{exact:1,misplaced:0});for(let e=0;e<=4;e++)for(let m=0;m<=4-e;m++){if(e===3&&m===1)continue;assert.deepEqual(decodeFeedback(feedbackKey({exact:e,misplaced:m},4),4),{exact:e,misplaced:m});}assert.throws(()=>feedbackKey({exact:3,misplaced:1},4));});