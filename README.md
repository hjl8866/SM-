# SN Query - Cloudflare 版（纯 HTML 前端 + Workers 后端 + D1 数据库）

## 目录结构
- index.html          查询页（纯 HTML）
- admin.html          管理后台（纯 HTML，密码 884848）
- style.css
- app.js              公共请求封装
- functions/api/*.js  Cloudflare Pages Functions（自动变 /api/* 接口）
- wrangler.toml       Cloudflare 配置
- schema.sql          D1 建表

## 部署（推荐控制台方式）
1. 全部文件推到 GitHub 仓库
2. Cloudflare 控制台 → Workers & Pages → 创建 → Pages → 导入 GitHub 仓库
   - Framework preset: None
   - Build command: 留空
   - Build output directory: 留空（根目录即为站点）
3. 创建 D1 数据库：
   - Workers & Pages → D1 → Create database → 名 sn_query
   - 复制 database_id 填到 wrangler.toml
4. 初始化表（控制台 D1 → 你的库 → Console 执行）：
     sqlite3 下执行 schema.sql 内容
   或用 wrangler: wrangler d1 execute sn_query --remote --file=schema.sql
5. 绑定 D1 到 Pages：
   - Pages 项目 → Settings → Storage bindings / D1 databases
   - Variable name 填 DB（与 wrangler.toml 的 binding 一致）
6. 访问 https://xxx.pages.dev 查询，admin.html 进入后台（884848）

## 部署（Wrangler 命令行）
wrangler login
wrangler d1 create sn_query
# 把输出的 id 填进 wrangler.toml
wrangler d1 execute sn_query --remote --file=schema.sql
wrangler deploy

## 后台密码
默认 884848，改密码需同时改：
- functions/api/login.js 的 PASSWORD
- functions/api/devices.js 的 auth() 内字符串
