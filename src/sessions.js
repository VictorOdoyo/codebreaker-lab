import {rules} from './rules.js';
import {createScorer} from './scorer.js';
import {replay} from './candidates.js';
import {text,choice} from './validate.js';
export function decodeSession(value){const data=typeof value==='string'?JSON.parse(text(value,100000)):structuredClone(value);if(!data||data.version!==1||data.kind!=='deduction')throw new RangeError('Unsupported session format');const r=rules(data.rules),s=createScorer(r),result=replay(s,data.history);if(!result.ids.length)throw new RangeError('Session feedback is contradictory');choice(data.strategy??'minimax',['minimax','entropy','expected']);choice(data.pool??'all',['all','candidates','sample']);return {version:1,kind:'deduction',rules:r,history:structuredClone(data.history??[]),strategy:data.strategy??'minimax',pool:data.pool??'all'};}
export function encodeSession(state){return JSON.stringify(decodeSession({...state,version:1,kind:'deduction'}),null,2);}
