# 小红书图文生成器部署文档

## 目录
- [环境要求](#环境要求)
- [本地开发部署](#本地开发部署)
- [Docker部署](#docker部署)
- [生产环境部署](#生产环境部署)
- [Vercel部署](#vercel部署)
- [常见问题](#常见问题)

## 环境要求

### 必需组件
- Node.js >= 18.0.0
- npm 或 yarn
- Git

### 可选组件
- Docker >= 20.10.0
- Docker Compose >= 2.0.0
- PM2 (用于生产环境进程管理)

## 本地开发部署

### 1. 克隆项目


```bash
git clone https://github.com/yourusername/xhs-card-generator.git
cd xhs-card-generator
```

### 2. 安装依赖

```bash
npm install
```


### 3. 环境变量配置
复制环境变量示例文件：

```bash
cp .env.example .env.local
```

配置以下必要的环境变量：

```plaintext
OpenAI API配置
OPENAI_API_KEY=your_api_key
OPENAI_API_BASE_URL=https://api.openai.com/v1
应用配置
NEXT_PUBLIC_API_URL=your_api_url
NODE_ENV=development
PORT=3000
其他可选配置
ENABLE_RATE_LIMIT=true
MAX_REQUESTS_PER_HOUR=100
```

### 4. 启动开发环境

```bash
npm run dev
```

访问 http://localhost:3000 查看应用

## Docker部署

### 1. 构建镜像

```bash
docker build -t xhs-card-generator .
```

### 2. 运行容器

```bash
docker run -d \
-p 3000:3000 \
--name xhs-card \
--env-file .env.production \
xhs-card-generator
```


### 使用Docker Compose部署

```bash
docker-compose up -d
```

## 生产环境部署

### 1. 准备工作
- 确保服务器已安装 Node.js、npm 和 PM2
- 配置好域名和SSL证书
- 准备好生产环境的环境变量

### 2. 部署步骤

```bash
# 克隆项目
git clone https://github.com/yourusername/xhs-card-generator.git
cd xhs-card-generator
# 安装依赖
npm install --production
# 构建项目
npm run build
# 使用PM2启动服务
pm2 start ecosystem.config.js
```


### 3. Nginx配置示例

```nginx
server {
listen 80;
server_name your-domain.com;
# SSL配置
listen 443 ssl;
ssl_certificate /path/to/cert.pem;
ssl_certificate_key /path/to/key.pem;
location / {
proxy_pass http://localhost:3000;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
}
}
```


## Vercel部署

### 1. 准备工作
- GitHub账号
- Vercel账号
- 项目的环境变量

### 2. 部署步骤
1. Fork项目到自己的GitHub仓库
2. 在Vercel控制台中导入项目
3. 配置环境变量
4. 点击Deploy进行部署

### 3. 自动部署配置
- 启用GitHub集成
- 配置自动部署触发条件
- 设置部署通知

## 常见问题

### 1. 部署后无法访问API
- 检查环境变量是否正确配置
- 确认API密钥是否有效
- 检查网络防火墙设置

### 2. 内存溢出问题

```bash
# 调整Node.js内存限制
NODE_OPTIONS="--max-old-space-size=4096" npm run start
```

### 3. PM2常用命令

```bash
# 查看应用状态
pm2 status
# 查看日志
pm2 logs
# 重启应用
pm2 restart xhs-card
# 停止应用
pm2 stop xhs-card
```


### 4. 性能优化建议
- 启用Redis缓存
- 配置CDN加速
- 开启Gzip压缩
- 使用PM2的cluster模式

## 监控和维护

### 1. 日志管理
- 配置日志轮转
- 设置错误告警
- 定期检查日志文件大小

### 2. 性能监控
- 配置服务器监控
- 设置资源使用告警
- 定期检查性能指标

### 3. 备份策略
- 定期备份数据
- 备份环境配置
- 保存部署脚本

## 安全建议

1. 始终使用HTTPS
2. 定期更新依赖包
3. 配置适当的CORS策略
4. 启用请求速率限制
5. 定期审查访问日志

## 联系支持

如遇到部署问题，请通过以下方式联系：
- GitHub Issues
- 网站: https://www.xhscard.top/
- 邮箱: your-email@example.com





