# SN Query - 序列号查询系统（Cloudflare Pages 版）

## 说明
- 所有页面均为纯 HTML（index.html / admin.html）
- 后端为 Cloudflare Pages Functions（functions/api/*.js）
- 数据库为 Cloudflare D1（SQLite）

## 结构
- index.html              查询页
- admin.html              管理后台（密码 884848）
- style.css / app.js      样式与请求封装
- functions/api/query.js  查询
- functions/api/login.js  登录
- functions/api/logout.js 退出
- functions/api/devices.js 设备增删查（需鉴权）
- wrangler.toml           Cloudflare 配置
- schema.sql              D1 建表

## 部署步骤
1. 把整个仓库推送到 GitHub
2. Cloudflare 控制台 → Workers & Pages → 创建 → Pages → 连接 GitHub
3. 构建设置：
   - 构建命令：留空
   - 部署命令：留空
   - 输出目录：留空
4. 绑定 D1：
   - 先创建 D1 数据库：Workers & Pages → D1 → Create database（名 sn_query）
   - 把 database_id 填到 wrangler.toml
   - Pages 设置 → 存储(D1) → 绑定变量名 DB
5. 在 D1 控制台执行 schema.sql 建表
6. 访问 xxx.pages.dev 查询，/admin.html 进后台

## 后台密码
默认 884848，修改需同步改两处：
- functions/api/login.js 的 PASSWORD
- functions/api/devices.js 的 auth()

## 接口
- POST /api/query        {sn}
- POST /api/login        {pwd}
- GET  /api/devices      header: Authorization: Bearer <token>
- POST /api/devices      header + {sn,model,activate_time}
- DELETE /api/devices?id=1
- POST /api/logout
