# cod7ce.github.io

产品站。三个自己每天在用的 macOS 工具，加一页简历。

线上地址：<https://cod7ce.github.io>

Astro 构建，GitHub Actions 部署到 GitHub Pages。

## 结构

| 路径 | 用途 |
| --- | --- |
| `src/content/products/*.md` | 每个产品一个文件。frontmatter 是元数据，正文是详情页内容 |
| `src/content/posts/*.md` | 2013 年旧站的文章存档。不在导航里，但老地址仍可访问 |
| `src/pages/index.astro` | 首页 |
| `src/pages/about.astro` | 关于（简历） |
| `src/pages/products/[slug].astro` | 产品详情页模板 |
| `src/lib/releases.ts` | 构建时从 GitHub Releases 取版本号和安装包体积 |
| `src/styles/global.css` | 全站设计系统 |

## 加一个产品

在 `src/content/products/` 下新建一个 `.md`：

```markdown
---
order: 4                      # 首页排序
name: 产品名
subtitle: 英文名或副标题
tagline: 一句话说清它做什么
blurb: 补充半句，跟在 tagline 后面显示
icon: /icons/xxx.png          # 可选，没有则画一个占位图形
accent: "#4ade80"             # 该产品的主色，详情页整页跟着变
repo: cod7ce/xxx
platform: macOS
stack: [Swift]
license: MIT
version: "0.1.0"              # 兜底值，取不到 Release 时用
assetPattern: "\\.zip$"       # 匹配 Release 里哪个安装包
downloadSize: 1.0 MB          # 同样是兜底值
---

正文用 Markdown 写，`##` 二级标题会自动带上终端风格的 `##` 前缀。
```

版本号和体积每次构建时从 GitHub Releases API 现取，frontmatter 里的值只在取不到时兜底。
工作流每天定时重建一次，所以发了新 Release 不用手动改站点。

## 本地开发

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # 产物在 dist/
npm run preview
```

## 设计

暗色终端风格，只有一套主题。配色、字体、间距全部在 `src/styles/global.css` 顶部的
自定义属性里，`--tone` 是会被每个产品页覆盖的强调色。
