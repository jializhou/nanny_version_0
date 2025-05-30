# 家政服务APP

基于React Native + Expo开发的家政服务移动应用。

## 功能特点

- 用户认证（登录/注册）
- 个人信息管理
- 支付方式管理
- 多语言支持（中文/英文）
- 深色模式支持
- 响应式设计

## 技术栈

- React Native
- Expo
- TypeScript
- i18next (国际化)
- React Navigation
- Expo Router

## 开始使用

### 前置要求

- Node.js (v14+)
- npm 或 yarn
- Expo CLI
- iOS模拟器或Android模拟器（可选）

### 安装步骤

1. 克隆仓库
```bash
git clone [repository-url]
cd nanny_version_0
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 在模拟器或真机上运行
- 使用Expo Go应用扫描QR码
- 或按`i`在iOS模拟器中运行
- 或按`a`在Android模拟器中运行

## 开发

### 项目结构

```
app/
  ├── (auth)/       # 认证相关页面
  ├── (forms)/      # 表单页面
  ├── (tabs)/       # 主要标签页面
  ├── (user)/       # 用户相关页面
  └── _layout.tsx   # 根布局
components/         # 可复用组件
constants/         # 常量定义
contexts/          # React Context
i18n/              # 国际化文件
```

### 开发命令

- `npm run dev` - 启动开发服务器
- `npm run ios` - 在iOS模拟器中运行
- `npm run android` - 在Android模拟器中运行
- `npm run web` - 在Web浏览器中运行

## 贡献

欢迎提交Issue和Pull Request。

## 许可证

MIT
