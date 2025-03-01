```markdown:README.md
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
