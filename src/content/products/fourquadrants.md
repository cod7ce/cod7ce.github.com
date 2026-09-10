---
order: 1
name: 肆
subtitle: FourQuadrants
tagline: 把一周要做的事扔进四个格子
blurb: 艾森豪威尔矩阵的原生实现。紧急和重要是两件事，分开看才知道该先干哪个。
icon: /icons/fourquadrants.png
accent: "#ef5b4c"
repo: cod7ce/FourQuadrants
platform: macOS / iOS
stack: [SwiftUI, SwiftData, XcodeGen]
license: 个人项目，按原样提供
version: "0.17.1"
assetPattern: "\\.zip$"
downloadSize: 3.3 MB
screenshot: ../../assets/screenshots/fourquadrants-overview.png
screenshotAlt: 肆的总览界面。左侧是导航和标签列表，右侧把本周任务分在四个象限里，每个象限有独立的进度条、子任务和已完成折叠区
screenshotCaption: 总览 · 「终端」深色主题 · 底部常驻本地保存状态
---

## 为什么会有它

待办清单的问题在于，它把所有事拉平成一条线。真正难的从来不是"还有什么没做"，
而是"这么多没做的，先动哪个"。

艾森豪威尔矩阵给的答案很简单：紧急和重要是两个独立的维度，交叉一下得到四个格子。
救火的事进左上，长期有价值的事进右上，别人的急事进左下，剩下的进右下。
道理谁都懂，难的是每天真的把事情丢进格子里 —— 所以拖拽必须够顺手，顺手到不用想。

## 它能做什么

- **四象限总览**。紧急且重要 / 重要不紧急 / 紧急不重要 / 不紧急不重要，拖拽换象限、排序、嵌套一气呵成。
- **多级子任务**，最深三层。再深就该拆成两件事了。
- 标签分组、进度点评、富文本详情，自动识别链接和工单号。
- **本周议程与日历视图**，没做完的自动结转到下周，另有一个收集箱接住临时冒出来的事。
- **可扩展主题**。默认跟随系统，另附一套「终端」深色主题。背景图、界面透明度和模糊都能调。
- **本地优先**。数据存在本地，有 iCloud 就自动同步，没有也照常用。

## 自己写的自动更新

App 启动后会在后台查一次 GitHub Releases，发现更高版本就提示。确认之后：下载 zip、
`ditto` 解压、去掉隔离属性，然后写一段脚本，等 App 退出后原地替换 `.app` 再重启。

没用 Sparkle。Sparkle 需要 Developer ID 签名，而这是个 ad-hoc 签名的个人项目 ——
自己写一个反而是当下唯一走得通的路。

## 构建

工程文件不进版本库，`project.yml` 是唯一的事实来源：

```bash
brew install xcodegen
xcodegen generate
open FourQuadrants.xcodeproj
```

需要 Xcode 26，部署目标是 macOS / iOS 26。打一个 `v*` 标签就会触发 CI 构建 Release 版
`.app`，打包成 zip 传到对应 Release。
