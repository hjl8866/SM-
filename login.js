const PASSWORD = '884848';
export async function onRequestPost({ request }) {
  const { pwd } = await request.json();
  if (pwd !== PASSWORD) return Response.json({ ok:false, error:'密码错误' }, { status:401 });
  return Response.json({ ok:true, token: btoa('admin:884848') });
}
