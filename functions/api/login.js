export async function onRequestPost({ request, env }) {
  try {
    const { pwd } = await request.json();
    if (pwd !== '884848') {
      return Response.json({ ok: false, error: '密码错误' }, { status: 401 });
    }
    return Response.json({ ok: true, token: btoa('admin:884848') });
  } catch (e) {
    return Response.json({ ok: false, error: '请求格式错误' }, { status: 400 });
  }
}
