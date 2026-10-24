import {rules,validateCode} from './rules.js';
export function codeSpace(input={}){const r=rules(input),out=[];function visit(prefix){if(prefix.length===r.length){out.push(prefix);return;}for(let c=0;c<r.colors;c++)if(r.repeats||!prefix.includes(c))visit([...prefix,c]);}visit([]);return out;}
export function codeKey(code){return code.join('');}
export function parseCode(value,input={}){if(typeof value!=='string'||!/^\d+$/.test(value))throw new TypeError('Code must contain digits 0..9');return validateCode(Array.from(value,Number),input);}
