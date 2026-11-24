export function report(rows) {
  if (!Array.isArray(rows) || !rows.length) throw new Error('Expected at least one sample record');
  rows=rows.map(row=>({...row}));
  for (const row of rows) {
    if (["id","sensor","value"].some(k=>row[k]==null)) throw new Error('Missing required field');
    if (typeof row.value==='string' && row.value.trim()) row.value=Number(row.value);
    if (!Number.isFinite(row.value)) throw new Error('Expected a numeric metric');
  }
  return {alerts:rows.filter(r=>r.value>=30).map(r=>r.sensor),average:Math.round(rows.reduce((s,r)=>s+r.value,0)/rows.length*100)/100,spread:Math.max(...rows.map(r=>r.value))-Math.min(...rows.map(r=>r.value))};
}
