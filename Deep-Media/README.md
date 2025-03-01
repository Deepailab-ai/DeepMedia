# 小红书图文生成器-作者HHY

一个基于 AI 技术的小红书文案创作助手，帮助创作者快速生成吸引人的内容。

## ✨ 功能特点

- 🤖 AI 智能创作
  - 灵感创作：输入主题一键生成原创文案
  - 爆款仿写：参考爆款笔记智能改写
  - 智能优化：自动生成吸引人的标题和内容结构

- 🎨 专业排版设置
  - 多种精选字体（思源黑体、思源宋体、霞鹜楷等）
  - 灵活的字号调整（14px - 20px）
  - 10种精美背景色（薄荷、梦幻、暖阳等）

- 💫 便捷的编辑功能
  - 实时预览效果
  - 一键生成内容
  - 支持内容二次编辑
  - 多种内容风格（轻松活泼、专业严谨、感性温暖）

- 📤 便捷导出
  - 一键复制文本
  - 快速下载图片
  - 保持内容排版

## 🚀 使用方法

### 灵感创作模式
1. 输入创作主题
2. 点击"AI一键创作"
3. 编辑完善内容
4. 导出使用

### 爆款仿写模式
1. 粘贴参考内容
2. 输入核心关键词
3. 选择内容风格
4. 智能生成原创内容

## 🛠️ 技术栈

- [Next.js 14](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - 样式框架
- [TypeScript](https://www.typescriptlang.org/) - 类型支持
- AI 驱动的内容生成引擎

## 💡 使用建议

- 提供详细的关键词和场景描述，获得更好的生成效果
- 生成后可以适当修改，使内容更符合个人风格
- 建议每次生成前明确内容主题和目标受众

## 🔒 隐私保护

- 所有生成的内容仅供用户个人使用
- 不保存用户输入的原创内容
- 确保创作过程安全可靠

## 🤝 联系我们

如果您在使用过程中遇到任何问题，或有功能建议，欢迎通过网站的"联系我们"按钮与我们联系。

## 📄 许可证

本项目采用修改版 [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) 开源许可证。

1. **非商业使用**
   - 允许个人和非营利组织免费使用、复制、修改和分发本项目的代码
   - 允许用于学习、研究和教育目的
   - 必须遵守 GPL v3 关于代码开源的要求

3. **开源要求**
   - 如果您修改了代码，需要开放源代码
   - 修改后的软件也必须使用相同的许可证条款

4. **免责声明**
   - 本软件按"原样"提供，不提供任何明示或暗示的保证

如需商业授权，请通过以下方式联系：
- 网站: 

## 📁 项目结构

```
xhs/
├── app                      # Next.js 应用主目录
│   ├── api                      # API 路由
│   │   ├── auth
│   │   │   ├── login
│   │   │   │   └── route.ts
│   │   │   └── register
│   │   │       └── route.ts
│   │   ├── generate
│   │   │   ├── ai-card
│   │   │   │   └── route.ts
│   │   │   ├── hot-post
│   │   │   │   └── route.ts
│   │   │   └── image-card
│   │   │       └── route.ts
│   │   └── user
│   │       └── usage-records
│   │           └── route.ts
│   ├── auth
│   │   ├── login
│   │   │   └── page.tsx
│   │   └── register
│   │       └── page.tsx
│   ├── components               # 可复用组件
│   │   ├── AICardEditor.tsx
│   │   ├── AIContentEditor.tsx
│   │   ├── analytics.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── FontSelector.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HotPostEditor.tsx
│   │   ├── Icons.tsx
│   │   ├── ImageTextEditor.tsx
│   │   ├── MarkdownCard.tsx
│   │   ├── Preview.tsx
│   │   ├── PricingSection.tsx
│   │   ├── Providers.tsx
│   │   ├── UserExamples.tsx
│   │   └── XhsEditor.tsx
│   ├── hooks                    # 自定义Hooks
│   │   ├── useAnalytics.ts
│   │   └── useUsageRecords.ts
│   ├── middleware
│   │   └── checkUsageLimit.ts
│   ├── types                    # 类型定义
│   │   ├── analytics.d.ts
│   │   └── editor.ts
│   ├── utils                    # 工具函数
│   │   └── toast.ts
│   ├── _document.tsx
│   ├── error.tsx
│   ├── favicon.ico
│   ├── favicon1.ico
│   ├── fonts.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── lib
│   ├── auth.ts
│   └── prisma.ts
├── prisma
│   ├── migrations
│   │   ├── 20250109150953_add_user_records_index
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── public                   # 静态资源
│   ├── user-examples
│   │   ├── xhs-example1.png
│   │   ├── xhs-example2.png
│   │   ├── xhs-example3.png
│   │   ├── xhs-example4.png
│   │   └── xhs-example5.png
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── og-image.jpg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── vercel.svg
│   ├── wechat.jpg
│   ├── wechatpay.jpg
│   └── window.svg
├── types                    # 类型定义
│   └── next-auth.d.ts
├── .htaccess
├── DEPLOY.md
├── middleware.ts
├── next-env.d.ts
├── next.config.js
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.js
├── postcss.config.mjs
├── README.md
├── tailwind.config.js
├── tailwind.config.ts
├── Tree.md
├── tree.py
└── tsconfig.json
```

### 核心目录说明

- `app/`: Next.js 14 应用主目录
  - `api/`: API路由
    - `auth/`: 认证相关接口（登录、注册）
    - `generate/`: 内容生成接口
    - `user/`: 用户相关接口
  - `components/`: 核心功能组件
  - `middleware/`: 中间件（使用限制检查等）
  - `hooks/`: 自定义React Hooks
  - `types/`: TypeScript类型定义
  - `utils/`: 工具函数集合

- `lib/`: 核心库文件
  - 认证和数据库相关功能

- `prisma/`: 数据库相关
  - 数据库模型和迁移管理

- `public/`: 静态资源目录
  - 示例图片和其他静态资源

### 主要技术栈

- 前端框架：Next.js 14
- UI框架：Tailwind CSS
- 开发语言：TypeScript
- 数据库：Prisma ORM
- AI集成：OpenAI API
- 部署：Vercel
