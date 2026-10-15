---
title: "How to Add Citations (Demo)"
date: "2026-10-15"
description: "A draft post demonstrating how to cite papers from a BibTeX file in a blog post."
draft: true
category: "Technical"
tags: ["writing", "demo"]
---

这篇是演示引用写法的草稿，只在本地 `npm run dev` 时可见，不会发布到线上。

## 用 BibTeX 引用

1. 把 BibTeX 粘贴到 `content/references.bib`（直接从 Google Scholar、arXiv 或 DBLP 复制即可）。
2. 在正文里用 `[@key]` 引用，`key` 就是 BibTeX 条目 `@inproceedings{key, ...}` 里的那个名字。

比如：Transformer 完全基于注意力机制，抛弃了循环结构 [@vaswani2017attention]。深度学习在过去十年里取得了巨大进展 [@lecun2015deep]。

页面上会按照**第一次被引用的顺序**自动编号为 [1]、[2]……，作者、标题、会议、年份和链接都会自动从 BibTeX 生成，统一显示在文末的 **References** 里。

## 多次引用同一篇

Adam 优化器 [@kingma2015adam] 结合了 Momentum 和 RMSProp 的思想；在实践中，Adam 通常是一个不错的默认选择 [@kingma2015adam]。两处共用同一个编号，参考文献里会有两个返回按钮，分别跳回各自的位置。

## 一处引用多篇

用分号隔开：`[@a; @b]`。比如：大模型在安全领域的能力仍有待系统评估 [@vaswani2017attention; @chen2026crebench]。

## 只给某篇文章用的 .bib

如果不想把所有文献都放进全局的 `references.bib`，可以在文章的 frontmatter 里加一行：

```yaml
bibliography: "bib/my-post.bib"
```

路径相对于 `content/` 目录，也可以写成列表引用多个文件。全局的 `references.bib` 始终会被加载。

## 和普通脚注混用

不是论文、只是想补充说明的内容，仍然可以用脚注 `[^note]`[^note]。它们和 BibTeX 引用共用同一套编号，都显示在 References 里。

[^note]: 这是一条普通脚注，内容是手写的，不来自 BibTeX。
