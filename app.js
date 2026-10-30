const API='/api';
function val(id){return document.getElementById(id).value.trim();}
function valClear(ids){ids.forEach(i=>document.getElementById(i).value='');}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function show(id){document.getElementById(id).classList.remove('hidden');}
function hide(id){document.getElementById(id).classList.add('hidden');}
function showMsg(t){const m=document.getElementById('msg');m.textContent=t;m.classList.add('show');setTimeout(()=>m.classList.remove('show'),3000);}
function getToken(){return localStorage.getItem('sn_token')||'';}
function setToken(t){localStorage.setItem('sn_token',t);}
function clearToken(){localStorage.removeItem('sn_token');}
async function post(path,body){try{const r=await fetch(API+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});return await r.json();}catch(e){return {ok:false,error:'网络错误'};}}
async function authFetch(path,opt={}){const h={'Content-Type':'application/json'};const t=getToken();if(t)h['Authorization']='Bearer '+t;try{const r=await fetch(API+path,{...opt,headers:h});return await r.json();}catch(e){return {ok:false,error:'网络错误'};}}
function authGet(path){return authFetch(path);}
function authPost(path,body){return authFetch(path,{method:'POST',body:JSON.stringify(body)});}
