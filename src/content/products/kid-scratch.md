---
order: 2
name: 小小创客
subtitle: Kid Scratch App
tagline: 给孩子的 Scratch，装在自己电脑上
blurb: 官方 Scratch 3 的完整内核，套一层童趣外壳。断网也能玩，作品自动保存在本地。
icon: /icons/kid-scratch.png
accent: "#f5a524"
repo: cod7ce/kid-scratch-app
platform: macOS (Apple Silicon)
stack: [Electron, scratch-gui, Node.js]
license: AGPL-3.0-only
version: "0.1.4"
assetPattern: "\\.dmg$"
downloadSize: 140 MB
---

## 为什么会有它

官方 Scratch 在浏览器里跑得很好，前提是网络也很好。孩子在画一个作品画到一半，
网卡一下，或者不小心关了标签页，半小时就没了。

所以把它搬到本地：内核直接用官方 [`scratch-gui`](https://github.com/scratchfoundation/scratch-editor) 5.3.0 的预编译产物，
积木、造型编辑器、声音编辑器和 `.sb3` 格式跟官方一模一样，作品随时能拿回 scratch.mit.edu 继续用。
外面套的是一层更适合小孩的壳。

## 它能做什么

- **作品墙**。大卡片配缩略图，点一下进编辑器。新建、改名、复制、导出、删除，删掉的先进回收站。
- **童趣皮肤**。糖果色菜单栏，更大的绿旗和停止按钮，圆角卡片和舞台。
- **自动保存**。停手 2.5 秒存一次，一直在画则每 45 秒兜底一次。关窗前主进程会先要求编辑器落盘。
  写文件走「临时文件 + rename」，中途断电不会写坏原文件。每 5 分钟留一个历史版本，最多二十个，随时能回退。
- **素材库**。内置 14 个角色、7 个背景、8 个音效，全是本仓库自制的 SVG 和合成音频。
  官方素材库照常可用，本地服务器做缓存代理，用过一次就永久离线可用。
  想加自己画的图、自己录的音，丢进 `我的素材` 文件夹就能选。

## 踩过的三个坑

**素材库点了没反应，还一声不吭。** `scratch-storage` 默认优先用 Web Worker 拉数据，
而 `scratch-gui` 的预编译产物里根本没随包发出 `chunks/fetch-worker.*.js`，`new Worker(...)` 直接 404。
worker 起不来的时候它既不 reject 也不回退，`storage.load()` 就永远 pending —— 没有报错，没有超时，什么都没有。
解法是把 worker 工具摘掉，只留主线程 fetch。

**窗口关不掉，点作品墙也没反应。** `scratch-gui` 自带 `beforeunload`，原本用来提醒「有未保存的改动」。
Electron 遇到它会发 `will-prevent-unload`，没人处理就直接取消跳转和关窗，而且不弹任何提示。
更难受的是这个坑只有真实鼠标事件才复现 —— Chromium 要求 frame 有 sticky activation 才走 `beforeunload`，
`executeJavaScript` 的 `userGesture` 参数不够格。

**同一个 tag 下冒出两个 Release。** electron-builder 对 dmg 和 zip 两个 target 是并行发布的。
Release 还不存在时，两个 publisher 会各建一个，而 `/releases/latest` 可能正好返回那个只有 blockmap、
没有安装包的空壳，自动更新就会一直说「找不到安装包」。现在发布脚本和 CI 都会在结束时校验
「同一 tag 只有一个 Release」，客户端也不再信任 `/releases/latest`，改成拉最近十个自己挑。

## 体积从哪来

打包后 App 约 305 MB，安装包约 140 MB。Electron 运行时占大头，`scratch-gui` 的预编译产物约 52 MB。

构建时用 `files` 白名单只挑 `node_modules/scratch-gui/dist/**`。不挑的话 electron-builder 会把
`scratch-gui` 七百多个构建期依赖也打进去，`app.asar` 从 51 MB 涨到 481 MB。

## 自检

```bash
npm run selftest
```

会真的启动一次 App，逐项验证：编辑器挂载、中文界面、WebGL 渲染、素材代理、官方素材库缩略图、
真的从官方素材库选一个背景并确认加载成功、自动保存链路、`.sb3` 落盘与读回、缩略图生成、
真实鼠标点击返回作品墙。当前 26 项全过。

## 声明

本项目以 AGPL-3.0-only 发布，因为内嵌了同样是 AGPL-3.0 的 `scratch-gui` 预编译产物。

Scratch 是 MIT 媒体实验室 Scratch 团队的项目和商标。这个 App 只是给自家孩子做的一层本地外壳，
不隶属于、也未获 Scratch 团队背书。
