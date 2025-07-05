# Nicholas Carlini 学术网站克隆

这是 Nicholas Carlini 学术网站的完整克隆，使用 Next.js 15、TypeScript、Tailwind CSS 和 shadcn/ui 构建。

## 🌐 在线演示

- **Netlify 部署**: https://same-2zf4c0o7n8q-latest.netlify.app

## ✨ 功能特性

- 📱 响应式设计，支持所有设备
- 📝 完整的学术页面：Papers、Talks、Code、Writing
- 📄 Writing 部分支持 markdown 文章上传
- 🎨 完美复制原网站的学术风格和布局
- ⚡ 基于 Next.js 15 的现代技术栈
- 🔧 易于自定义和个人化

## 🚀 本地部署指南

### 前置要求

- Node.js 18.0 或更高版本
- Bun（推荐）或 npm

### 步骤

1. **克隆项目**
   ```bash
   git clone <your-repo-url>
   cd nicholas-carlini-clone
   ```

2. **安装依赖**
   ```bash
   # 使用 Bun (推荐)
   bun install

   # 或使用 npm
   npm install
   ```

3. **启动开发服务器**
   ```bash
   # 使用 Bun
   bun dev

   # 或使用 npm
   npm run dev
   ```

4. **访问网站**
   打开浏览器访问 `http://localhost:3000`

### 构建生产版本

```bash
# 构建静态文件
bun run build

# 预览构建结果
bun run start
```

构建后的静态文件将在 `out` 目录中。

## 📦 GitHub Pages 部署

项目已配置为支持 GitHub Pages 静态部署。

### 自动部署（推荐）

1. **将代码推送到 GitHub 仓库**

2. **创建 GitHub Actions 工作流**

   在项目根目录创建 `.github/workflows/deploy.yml`：

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest

       steps:
       - name: Checkout
         uses: actions/checkout@v4

       - name: Setup Bun
         uses: oven-sh/setup-bun@v1
         with:
           bun-version: latest

       - name: Install dependencies
         run: bun install

       - name: Build
         run: bun run build

       - name: Deploy to GitHub Pages
         uses: peaceiris/actions-gh-pages@v3
         if: github.ref == 'refs/heads/main'
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./out
   ```

3. **启用 GitHub Pages**
   - 进入仓库的 Settings → Pages
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "gh-pages"

### 手动部署

```bash
# 构建静态文件
bun run build

# 将 out 目录内容上传到 GitHub Pages
```

## 🎨 个人信息替换指南

要将网站内容替换为您的个人信息，需要修改以下文件：

### 1. 主页信息 (`src/app/page.tsx`)

**需要替换的内容：**
- 第 22 行：`Nicholas Carlini` → 您的姓名
- 第 25-32 行：个人简介段落
- 第 36-41 行：获奖和媒体报道信息
- 第 45-59 行：项目和代码信息
- 第 61-63 行：publications、code、writings 链接

**头像图片：**
- 第 71 行：`src="https://same-assets.com/portfolio/carlini-headshot.jpg"` → 您的头像图片URL

**联系信息：**
- 第 77 行：`Research Scientist, Anthropic` → 您的职位和公司
- 第 78 行：`nicholas [at] carlini [dot] com` → 您的邮箱
- 第 80-81 行：GitHub 和 Google Scholar 链接

### 2. 全局布局 (`src/app/layout.tsx`)

**需要替换的内容：**
- 第 17 行：`title: "Nicholas Carlini"` → 您的姓名
- 第 18 行：description → 您的个人描述

### 3. Papers 页面 (`src/app/papers/page.tsx`)

**需要替换的内容：**
- 第 14 行：导航中的 `Nicholas Carlini` → 您的姓名
- 第 35 行：页面标题 `Nicholas Carlini` → 您的姓名
- 第 36 行：`Research Scientist, Anthropic` → 您的职位
- 第 37 行：邮箱地址
- 第 39-40 行：GitHub 和 Scholar 链接
- 第 44+ 行：所有论文条目替换为您的论文

### 4. Talks 页面 (`src/app/talks/page.tsx`)

**需要替换的内容：**
- 导航信息（同上）
- 第 45+ 行：所有演讲条目替换为您的演讲

### 5. Code 页面 (`src/app/code/page.tsx`)

**需要替换的内容：**
- 导航信息（同上）
- 第 53+ 行：所有代码项目替换为您的项目

### 6. Writing 页面 (`src/app/writing/page.tsx`)

**需要替换的内容：**
- 导航信息（同上）
- 如果有现有文章，请替换为您的文章

### 7. 个人文章目录

删除或替换以下示例文章：
- `public/articles/sample-article.md`
- `public/articles/machines-ruthless-efficiency.md`

### 8. 网站图标和元数据

如需更换网站图标：
- 替换 `public/favicon.ico`
- 在 `src/app/layout.tsx` 中更新元数据

## 🛠️ 技术栈

- **框架**: Next.js 15
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **组件**: shadcn/ui
- **包管理**: Bun
- **部署**: Netlify / GitHub Pages

## 📝 添加新内容

### 添加新论文

在 `src/app/papers/page.tsx` 中的对应年份部分添加：

```tsx
<div className="mb-6">
  <p>
    <a href="论文链接" className="text-red-600 hover:text-red-800 text-lg font-semibold">
      论文标题
    </a>
  </p>
  <p className="text-gray-600 mt-1">
    作者列表. <em>会议/期刊名称</em>, 年份.
  </p>
  <p className="text-sm text-gray-500 mt-1">
    简短描述或获奖信息
  </p>
</div>
```

### 添加新的 Writing 文章

1. 在 `public/articles/` 中创建新的 markdown 文件
2. 文件名格式：`your-article-title.md`
3. 使用网站上的上传功能，或直接访问 `/writing/your-article-title` 查看

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

## 📄 许可证

本项目基于原网站内容进行克隆，仅供学习和个人使用。
