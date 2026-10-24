import {transform,mod} from './alphabet.js';
import {inverse,gcd} from './number-theory.js';
import {integer} from './validate.js';
export function affine(text,a=5,b=8,decrypt=false){integer(a,0,25,'multiplier');integer(b,0,25,'offset');const inv=inverse(a);return transform(text,x=>decrypt?mod(inv*(x-b)):mod(a*x+b));}
export function affineKeys(){const keys=[];for(let a=1;a<26;a++)if(gcd(a,26)===1)for(let b=0;b<26;b++)keys.push({a,b});return keys;}
