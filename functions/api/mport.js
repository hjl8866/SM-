function auth(request) {
  const h = request.headers.get('Authorization') || '';
  return h === 'Bearer ' + btoa('admin:884848');
}

export async function onRequestPost({ request, env }) {
  if (!auth(request)) return Response.json({ error: '未授权' }, { status: 401 });
  try {
    const { devices } = await request.json();
    if (!Array.isArray(devices) || devices.length === 0) return Response.json({ error: '设备列表为空' }, { status: 400 });
    let success = 0, failed = 0, errors = [];
    for (const d of devices) {
      try {
        if (!d.sn || !d.model || !d.activate_time) { failed++; errors.push('缺少参数: ' + (d.sn || '未知')); continue; }
        const date = new Date(d.activate_time);
        date.setFullYear(date.getFullYear() + 1);
        const warranty_end = date.toISOString().slice(0, 10);
        await env.DB.prepare('INSERT OR REPLACE INTO devices (serial_number, model, activate_time, warranty_end) VALUES (?,?,?,?)').bind(d.sn, d.model, d.activate_time, warranty_end).run();
        success++;
      } catch (e) { failed++; errors.push(d.sn + ': ' + e.message); }
    }
    return Response.json({ ok: true, success, failed, errors });
  } catch (e) {
    return Response.json({ error: '请求格式错误: ' + e.message }, { status: 400 });
  }
}
