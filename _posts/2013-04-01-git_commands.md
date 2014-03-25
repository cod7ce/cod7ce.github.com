---
layout: post
category : tool
tags : [git]
title: Git 命令使用总结
---
{% include JB/setup %}

## 别忘了
话说Git已经学习了有半年了，刚开始以为自己会用了。可每次遇到问题都会上网去查，索性整理下常用的git命令，即可帮助新手，又可以供自己忘记时翻看，何乐而不为？

<p class="lgs-input"><a href="#" class="button blue-button">Git 命令使用总结 PDF 下载</a></p>

## git基本配置

	# 设置用户名，用户邮箱
	git config user.name "your name"
	git config user.email yourname@email_server
	
	# 部分个性化设置
	git config core.editor vim    	# 默认编辑器
	git config core.paper "less -N"	# 
	git config color.diff true		# diff支持彩色
	
	# 设置别名
	git config alias.co checkout
	git config alias.st status
	
	# 查看配置列表清单
	git var -l
	
## git init

	# 创建一个新的版本库
	git init
	git init new/path

## git clone

	# 克隆仓库
	git clone url
	
## git add

	# 添加所有修改的文件到暂存区
	git add -a
	git add .
	
	# 添加指定修改文件到暂存区
	git filename
	
	# 选择性添加
	git add -i

## git rm

	# 删除文件
	git rm filename

## git mv

	# 移动\重命名文件
	git mv path/filename other_path/filename

## git log

	# 查看提交日志
	git log
	
	# 精简输出提交日志
	git log --pretty=oneline
	
	# 查看提交日志，并列出每次提交的文件变更统计
	git log --stat
	
	
## git status

	# 查看文件状态
	git status
	
	# 精简输出文件状态，文件名前缀含义如下：
	# M  = modified
	# D  = deleted
	# ?? = untracked file
	git status -s
	
### M 字符出现位置的含义
第一列：版本库中的文件与提交暂存区中的文件相比有改动。  
第二列：当前工作区中的文件与提交暂存区中的文件相比有改动。

## git diff

	# 查看当前工作区与暂存区文件差异
	git diff
	
	# 查看当前工作区与当前版本库中文件差异
	git diff HEAD
	
	# 查看暂存区与当前版本库中文件差异
	git diff --cached
	git diff --staged
	
	# 比较两个提交之间的文件差异（应该能类比到tag，branch吧？）
	git diff SHA11..SHA12
	
	# 统计查看文件差异
	git diff --stat 
	
### `git diff --stat` 使用技巧
我们知道`git diff SHA11..SHA12`是比较两次提交之间的文件差异，`git diff --stat`可以统计差异，自然会想到使用`git diff --stat SHA11..SHA12`便可以统计两次提交之间的文件差异了，那么两个分支是不是也可以这样呢？。

在真实的开发过程中，常常会有这样的场景，我们为一个新的功能开辟了一条新的分支，当完成代码后，需要与服务器经行同步，整个覆盖费时费力，于是，我们想要知道新的功能和主程序之间究竟哪些文件发生了变化？这时`git diff --stat`便可排上用场。

	git checkout new_branch
	git diff --stat master >> new_branch.diff
		
好了，打开`new_branch.diff`,覆盖这些文件就好，贴心呀。
	
### 请不要使用 `git commit -a`
在使用`git diff`命令时，你应该已经注意到git暂存区的存在了，而`git commit -a`命令则会跳过暂存区，让你的工作区与版本库直接联系，这会丢失很多git暂存区带来的好处，请不要使用这条命令。

## git reset

	# 撤销 git add 命令更新到暂存区的内容，工作区内容不变
	git reset
	git reset HEAD
提示：这命令尽量不用

## git checkout

	# 切换分支
	git checkout branch
	
	# 新建分支 new_branch，并切换到该分支 (使用频率较高)
	git checkout -b new_branch
	
	# 汇总显示工作区、暂存区与HEAD之间的差异
	git checkout
	git checkout HEAD

	# 去除所有工作区的修改（相对与暂存区，其中.可以换成文件名）
	git checkout .
	git checkout -- .

## git tag

	# 为当前版本库添加标签（tag_name就像HEAD一样，是个指针，指向了当前版本库，并永远停在这里）
	git tag -m "some messages" tag_name
	
## git branch

	# 查看所有分支
	git branch -a
	
	# 创建新的分支
	git branch new_branch
	
	# 删除分支
	git branch -d branch

## git archive

	# 归档
	git atchive -o latest.zip HEAD

## git 协作

	# 获取最新远端代码
	git fetch
	
	# 合并代码，大多数冲突会总动合并
	git merge
	
	git pull = git fetch + git merge
	
	# 推送代码到远端
	git push
	
### 有关git协作部分
如果有冲突，使用`git diff`命令可以看出冲突部分，使用<<<<<< ======= >>>>>>在区分版本冲突。
我还没有遇到非常复杂的协作冲突问题，如果遇到，协作部分应该会开一篇新博客来描述。

## 小结

推荐一本书《Git权威指南》蒋鑫著 机械工业出版社 [Link]()

> Copyrights [纸房子@WEB](http://zhifangzi.com),Edit by cod7ce.







