# cod7ce.github.io

个人主页与技术博客，基于 [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) 主题，由 GitHub Actions 构建后发布到 GitHub Pages。

线上地址：<https://cod7ce.github.io>

## 目录结构

| 路径 | 用途 |
| --- | --- |
| `index.md` | 首页，即那份简历 |
| `_posts/` | 博客文章，文件名格式 `YYYY-MM-DD-标题.md` |
| `_tabs/` | 侧边栏的归档、分类、标签页 |
| `_data/contact.yml` | 侧边栏底部的社交图标 |
| `_config.yml` | 站点配置 |
| `.github/workflows/pages-deploy.yml` | 构建与发布流程 |

## 写一篇新文章

在 `_posts/` 下新建 `YYYY-MM-DD-标题.md`：

```markdown
---
title: 文章标题
date: 2026-09-09 20:00:00 +0800
categories: [分类]
tags: [标签一, 标签二]
---

正文……
```

推到 `master` 后 GitHub Actions 会自动构建并发布，无需手动操作。

## 本地预览

需要 Ruby 3.1 以上：

```bash
bundle install
bundle exec jekyll serve
```

没装 Ruby 的话可以直接用 Docker：

```bash
docker run --rm -it -v "$PWD:/site" -w /site -p 4000:4000 ruby:3.4 \
  bash -c "bundle install && bundle exec jekyll serve --host 0.0.0.0"
```

## 升级主题

主题以 gem 形式引入，改 `Gemfile` 里的版本号后执行：

```bash
bundle update jekyll-theme-chirpy
```
