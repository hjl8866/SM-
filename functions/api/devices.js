function auth(request) {
  const h = request.headers.get('Authorization') || '';
  return h === 'Bearer ' + btoa('admin:884848');
}

export async function onRequestGet({ request, env }) {
  if (!auth(request)) return Response.json({ error: '未授权' }, { status: 401 });
  const { results } = await env.DB.prepare('SELECT * FROM devices ORDER BY id DESC').all();
  return Response.json({ ok: true, data: results });
}

export async function onRequestPost({ request, env }) {
  if (!auth(request)) return Response.json({ error: '未授权' }, { status: 401 });
  const { sn, model, activate_time } = await request.json();
  if (!sn || !model || !activate_time) return Response.json({ error: '参数不完整' }, { status: 400 });

  const d = new Date(activate_time);
  d.setFullYear(d.getFullYear() + 1);
  const warranty_end = d.toISOString().slice(0, 10);

  await env.DB.prepare(
    'INSERT INTO devices (serial_number, model, activate_time, warranty_end) VALUES (?,?,?,?)'
  ).bind(sn, model, activate_time, warranty_end).run();

  return Response.json({ ok: true });
}

export async function onRequestDelete({ request, env }) {
  if (!auth(request)) return Response.json({ error: '未授权' }, { status: 401 });
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  await env.DB.prepare('DELETE FROM devices WHERE id = ?').bind(id).run();
  return Response.json({ ok: true });
}
