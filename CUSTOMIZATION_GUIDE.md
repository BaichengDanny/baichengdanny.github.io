# 个人信息替换指南

## 主要需要替换的文件

### 1. src/app/page.tsx - 主页
- 第14行: 导航栏姓名
- 第25-32行: 个人简介段落
- 第71行: 头像图片URL
- 第75-81行: 联系信息(姓名、职位、邮箱、链接)

### 2. src/app/layout.tsx - 全局设置
- 第16-20行: 网站标题和描述

### 3. 其他页面
- src/app/papers/page.tsx: 论文列表
- src/app/talks/page.tsx: 演讲列表
- src/app/code/page.tsx: 项目列表
- src/app/writing/page.tsx: 文章列表

### 4. 删除示例文件
- public/articles/sample-article.md
- public/articles/machines-ruthless-efficiency.md

## 快速替换命令

```bash
# 替换基本信息
find src -name "*.tsx" -exec sed -i "s/Nicholas Carlini/您的姓名/g" {} \;
find src -name "*.tsx" -exec sed -i "s/Research Scientist, Anthropic/您的职位, 您的公司/g" {} \;
```

详细信息请查看 README.md 文件。
