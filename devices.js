function auth(request){
  const h = request.headers.get('Authorization') || '';
  return h === 'Bearer ' + btoa('admin:884848');
}
export async function onRequestGet({ request, env }){
  if(!auth(request)) return Response.json({error:'未授权'},{status:401});
  const { results } = await env.DB.prepare(`SELECT * FROM devices ORDER BY id DESC`).all();
  const today = new Date().toISOString().slice(0,10);
  results.forEach(r => r.in_warranty = r.warranty_end >= today);
  return Response.json({ ok:true, data:results });
}
export async function onRequestPost({ request, env }){
  if(!auth(request)) return Response.json({error:'未授权'},{status:401});
  const { sn, model, activate_time } = await request.json();
  if(!sn || !model || !activate_time) return Response.json({error:'参数不完整'},{status:400});
  const d = new Date(activate_time);
  d.setFullYear(d.getFullYear()+1);
  const warranty_end = d.toISOString().slice(0,10);
  try {
    await env.DB.prepare(
      `INSERT INTO devices (serial_number, model, activate_time, warranty_end) VALUES (?,?,?,?)`
    ).bind(sn, model, activate_time, warranty_end).run();
    return Response.json({ ok:true });
  } catch(e){
    return Response.json({error:'序列号可能已存在'},{status:400});
  }
}
export async function onRequestDelete({ request, env }){
  if(!auth(request)) return Response.json({error:'未授权'},{status:401});
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if(id) await env.DB.prepare(`DELETE FROM devices WHERE id = ?`).bind(id).run();
  return Response.json({ ok:true });
}
