import {choice} from './validate.js';
import {caesar,atbash} from './caesar.js';
import {affine} from './affine.js';
import {vigenere} from './vigenere.js';
import {autokey} from './autokey.js';
import {substitution} from './substitution.js';
import {railFence} from './rail-fence.js';
import {columnar} from './columnar.js';
import {polybius} from './polybius.js';
import {bifid} from './bifid.js';
export const CIPHERS=['caesar','atbash','affine','vigenere','beaufort','variant-beaufort','autokey','substitution','rail-fence','columnar','polybius','bifid'];
export function cipher(kind,value,{key='LEMON',shift=3,a=5,b=8,rails=3,order=[2,0,1],period=5,decrypt=false}={}){choice(kind,CIPHERS);switch(kind){case 'caesar':return caesar(value,shift,decrypt);case 'atbash':return atbash(value);case 'affine':return affine(value,a,b,decrypt);case 'vigenere':case 'beaufort':case 'variant-beaufort':return vigenere(value,key,decrypt,kind);case 'autokey':return autokey(value,key,decrypt);case 'substitution':return substitution(value,key,decrypt);case 'rail-fence':return railFence(value,rails,decrypt);case 'columnar':return columnar(value,order,decrypt);case 'polybius':return polybius(value,key,decrypt);case 'bifid':return bifid(value,key,period,decrypt);}}
