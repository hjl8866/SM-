export async function onRequestPost({ request, env }) {
  const { sn } = await request.json();
  if (!sn) return Response.json({ ok:false, error:'序列号不能为空' }, { status:400 });

  const row = await env.DB.prepare(
    `SELECT * FROM devices WHERE serial_number = ?`
  ).bind(sn).first();
  if (!row) return Response.json({ ok:false, error:'未查询到该设备' }, { status:404 });

  const inWarranty = new Date(row.warranty_end) >= new Date();
  return Response.json({
    ok:true,
    data:{
      model: row.model,
      activate_time: row.activate_time,
      warranty_end: row.warranty_end,
      in_warranty: inWarranty
    }
  });
}
