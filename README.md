# Academic Homepage for Researchers

这个学术主页网站使用 Next.js 15、TypeScript、Tailwind CSS 和 shadcn/ui 构建。

## ✨ 功能特性

- 📱 响应式设计，支持所有设备
- 📝 完整的学术页面：Papers、Talks、Code、Writing
- 📄 Writing 部分支持 markdown 文章及数学公式
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
   git clone https://github.com/BaichengDanny/baichengdanny.github.io.git
   cd baichengdanny.github.io.git
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

## 🛠️ 技术栈

- **框架**: Next.js 15
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **组件**: shadcn/ui
- **包管理**: Bun
- **部署**: Netlify / GitHub Pages

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

## 📄 许可证

本项目仅供学习和个人使用。
