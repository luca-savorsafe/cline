# Cline快速入门指南

## 概述

本指南旨在帮助开发者快速了解Cline项目，开始贡献代码或扩展功能。

## 1. 环境准备

### 1.1 系统要求
- Node.js 20.x 或更高版本
- VSCode 1.84.0 或更高版本
- Git

### 1.2 快速安装
```bash
# 克隆项目
git clone https://github.com/cline/cline.git
cd cline

# 安装所有依赖
npm run install:all

# 编译协议文件
npm run protos

# 启动开发模式
npm run dev
```

## 2. 项目结构速览

### 2.1 核心目录
```
cline/
├── src/                    # 核心扩展代码
│   ├── extension.ts       # 扩展入口点
│   ├── core/              # 核心架构
│   │   ├── webview/       # Webview管理
│   │   ├── controller/    # 控制器（状态管理）
│   │   └── task/          # 任务执行
│   ├── api/               # API提供商
│   └── integrations/      # 工具集成
├── webview-ui/            # 前端React应用
├── proto/                 # Protobuf定义
└── tests/                 # 测试代码
```

### 2.2 关键概念
- **WebviewProvider**: 管理VSCode webview
- **Controller**: 状态管理和任务协调
- **Task**: 执行AI请求和工具操作
- **API Providers**: 各种AI模型提供商
- **MCP**: Model Context Protocol，用于扩展功能

## 3. 开发工作流

### 3.1 常用命令
```bash
# 开发模式（自动重新加载）
npm run dev

# 编译扩展
npm run compile

# 运行测试
npm run test

# 代码检查
npm run lint

# 代码格式化
npm run format

# 打包扩展
npm run package
```

### 3.2 调试技巧
1. **VSCode调试配置**：使用内置的调试器
2. **开发模式热重载**：修改代码后自动重新加载
3. **日志输出**：查看控制台日志了解扩展运行状态

## 4. 添加新功能示例

### 4.1 添加简单的工具
```typescript
// 1. 在 src/integrations/ 创建新文件
// src/integrations/simple-tool.ts
import { ToolIntegration, ToolResult } from '../core/task/types'

export class SimpleTool implements ToolIntegration {
  async execute(params: any): Promise<ToolResult> {
    return {
      success: true,
      output: `工具执行成功，参数: ${JSON.stringify(params)}`
    }
  }
}

// 2. 在 src/integrations/index.ts 注册工具
import { SimpleTool } from './simple-tool'
export const tools = {
  // ... 现有工具
  'simple_tool': new SimpleTool(),
}
```

### 4.2 添加API提供商（简化版）
```typescript
// src/api/providers/simple-provider.ts
import { ApiProvider } from '../types'

export class SimpleProvider implements ApiProvider {
  async *createCompletionStream(request: any) {
    // 实现简单的流式响应
    yield { type: 'text', text: '这是一个测试响应' }
  }
}

// 注册提供商
// src/api/providers/index.ts
import { SimpleProvider } from './simple-provider'
export const providers = {
  // ... 现有提供商
  'simple': SimpleProvider,
}
```

## 5. 测试你的修改

### 5.1 运行测试
```bash
# 运行所有测试
npm run test

# 运行特定测试
npm run test:unit        # 单元测试
npm run test:integration # 集成测试
npm run test:e2e         # 端到端测试
```

### 5.2 手动测试
1. 在VSCode中按 `F5` 启动调试扩展
2. 打开命令面板 (`Ctrl+Shift+P`)
3. 输入 "Cline" 查看可用命令
4. 测试你的新功能

## 6. 提交贡献

### 6.1 代码规范
```bash
# 提交前运行代码检查
npm run lint
npm run format

# 如果有错误，自动修复
npm run fix:all
```

### 6.2 提交信息格式
使用约定式提交：
```
feat: 添加新功能
fix: 修复bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具变动
```

## 7. 常见任务

### 7.1 如何添加新的AI模型支持？
1. 在 `src/api/providers/` 创建新的提供商类
2. 实现 `createCompletionStream` 方法
3. 在 `src/api/providers/index.ts` 注册提供商
4. 更新类型定义

### 7.2 如何创建新的工具？
1. 在 `src/integrations/` 创建工具类
2. 实现 `execute` 方法
3. 在 `src/integrations/index.ts` 注册工具
4. 更新工具类型定义

### 7.3 如何调试webview前端？
1. 在VSCode中打开命令面板
2. 输入 "Developer: Open Webview Developer Tools"
3. 在开发者工具中调试React组件

## 8. 故障排除

### 8.1 常见问题

**Q: 扩展无法加载？**
A: 检查Node.js版本，确保是20.x，然后运行 `npm run install:all`

**Q: 协议文件编译失败？**
A: 运行 `npm run protos` 重新编译

**Q: 测试失败？**
A: 确保所有依赖已安装，运行 `npm run install:all`

**Q: 开发模式不热重载？**
A: 检查环境变量 `IS_DEV=true` 是否设置正确

### 8.2 获取帮助
- 查看项目文档：`docs/` 目录
- 查看现有代码示例
- 在GitHub Issues中搜索类似问题
- 加入Discord社区获取实时帮助

## 9. 下一步学习

### 9.1 深入学习
1. **阅读架构文档**：`.clinerules/cline-overview.md`
2. **查看核心组件**：`src/core/` 目录
3. **学习API系统**：`src/api/` 目录
4. **了解MCP集成**：`src/services/mcp/` 目录

### 9.2 实践项目
1. **添加一个简单的工具**：如时间戳转换器
2. **集成一个新的API**：如本地Ollama模型
3. **创建MCP服务器**：实现简单的数据查询
4. **改进现有功能**：优化错误处理或用户体验

### 9.3 贡献建议
- 从简单的bug修复开始
- 添加测试用例
- 改进文档
- 优化性能
- 添加新的示例

## 10. 资源链接

- **官方文档**: https://docs.cline.bot
- **GitHub仓库**: https://github.com/cline/cline
- **Discord社区**: https://discord.gg/cline
- **VSCode市场**: https://marketplace.visualstudio.com/items?itemName=saoudrizwan.parrot
- **问题追踪**: https://github.com/cline/cline/issues

## 总结

通过本快速入门指南，你应该能够：
1. 搭建Cline开发环境
2. 理解项目基本结构
3. 进行简单的代码修改
4. 测试和验证你的更改
5. 开始贡献代码

Cline是一个活跃的开源项目，欢迎所有开发者参与贡献。从简单的任务开始，逐步深入了解项目架构，你将成为Cline社区的重要成员！
