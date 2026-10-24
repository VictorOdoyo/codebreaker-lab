export function csvCell(value){const s=value===null||value===undefined?'':String(value);const safe=/^[=+@-]/.test(s)?"'"+s:s;return /[",\r\n]/.test(safe)?'"'+safe.replaceAll('"','""')+'"':safe;}
export function csv(rows,columns){return [columns,...rows.map(row=>columns.map(k=>row[k]))].map(row=>row.map(csvCell).join(',')).join('\r\n')+'\r\n';}
export function transcriptCSV(history){return csv(history.map((h,i)=>({turn:i+1,guess:h.guess.join(''),exact:h.response.exact,misplaced:h.response.misplaced})),['turn','guess','exact','misplaced']);}
