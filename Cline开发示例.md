# Cline开发示例与最佳实践

## 示例1：添加新的API提供商

### 场景：添加DeepSeek API支持

**步骤1：创建提供商实现**

```typescript
// src/api/providers/deepseek.ts
import { ApiProvider, ApiRequest, ApiStreamChunk } from '../types'
import { fetch } from '@/shared/net'

export class DeepSeekProvider implements ApiProvider {
  private apiKey: string
  private baseUrl = 'https://api.deepseek.com/v1'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async *createCompletionStream(request: ApiRequest): AsyncGenerator<ApiStreamChunk> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: request.model,
        messages: request.messages,
        stream: true,
        max_tokens: request.maxTokens
      })
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`)
    }

    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error('Failed to get response reader')
    }

    const decoder = new TextDecoder()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n').filter(line => line.trim())

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') continue

          try {
            const parsed = JSON.parse(data)
            if (parsed.choices?.[0]?.delta?.content) {
              yield {
                type: 'text',
                text: parsed.choices[0].delta.content
              }
            }
          } catch (error) {
            console.error('Failed to parse DeepSeek response:', error)
          }
        }
      }
    }
  }

  async getModels(): Promise<string[]> {
    return [
      'deepseek-chat',
      'deepseek-coder',
      'deepseek-reasoner'
    ]
  }
}
```

**步骤2：注册提供商**

```typescript
// src/api/providers/index.ts
import { DeepSeekProvider } from './deepseek'

export const providers = {
  // ... 现有提供商
  'deepseek': DeepSeekProvider,
}
```

**步骤3：更新类型定义**

```typescript
// src/api/types.ts
export type ProviderName = 
  | 'anthropic'
  | 'openrouter'
  | 'deepseek'  // 添加新提供商
  // ... 其他提供商
```

## 示例2：创建自定义工具

### 场景：创建数据库查询工具

**步骤1：创建工具集成**

```typescript
// src/integrations/database-tool.ts
import { ToolIntegration, ToolResult } from '../core/task/types'
import * as vscode from 'vscode'

export interface DatabaseQueryParams {
  query: string
  database?: string
  limit?: number
}

export class DatabaseTool implements ToolIntegration {
  async execute(params: DatabaseQueryParams): Promise<ToolResult> {
    try {
      // 模拟数据库查询
      const results = await this.executeQuery(params)
      
      return {
        success: true,
        output: `查询结果 (${results.length} 条记录):\n\`\`\`json\n${JSON.stringify(results, null, 2)}\n\`\`\``
      }
    } catch (error) {
      return {
        success: false,
        error: `数据库查询失败: ${error.message}`
      }
    }
  }

  private async executeQuery(params: DatabaseQueryParams): Promise<any[]> {
    // 这里实现实际的数据库查询逻辑
    // 示例：返回模拟数据
    return [
      { id: 1, name: '用户1', email: 'user1@example.com' },
      { id: 2, name: '用户2', email: 'user2@example.com' },
      { id: 3, name: '用户3', email: 'user3@example.com' }
    ].slice(0, params.limit || 10)
  }

  getDescription(): string {
    return '执行数据库查询并返回结果'
  }

  getParametersSchema(): any {
    return {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'SQL查询语句'
        },
        database: {
          type: 'string',
          description: '数据库名称（可选）'
        },
        limit: {
          type: 'number',
          description: '结果限制数量（可选）'
        }
      },
      required: ['query']
    }
  }
}
```

**步骤2：注册工具**

```typescript
// src/integrations/index.ts
import { DatabaseTool } from './database-tool'

export const tools = {
  // ... 现有工具
  'database_query': new DatabaseTool(),
}
```

**步骤3：更新工具类型定义**

```typescript
// src/core/task/types.ts
export interface ToolDefinition {
  // ... 现有工具定义
  database_query?: {
    query: string
    database?: string
    limit?: number
  }
}
```

## 示例3：使用MCP创建外部工具

### 场景：创建天气查询MCP服务器

**步骤1：创建MCP服务器**

```typescript
// weather-mcp-server.ts
import { Server } from '@modelcontextprotocol/sdk/server'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio'
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types'

const server = new Server(
  {
    name: 'weather-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

// 定义天气查询工具
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_weather',
        description: '获取指定城市的天气信息',
        inputSchema: {
          type: 'object',
          properties: {
            city: {
              type: 'string',
              description: '城市名称'
            },
            days: {
              type: 'number',
              description: '预报天数（1-7）',
              default: 3
            }
          },
          required: ['city']
        }
      }
    ]
  }
})

// 实现天气查询工具
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'get_weather') {
    const { city, days = 3 } = request.params.arguments as any
    
    // 模拟天气API调用
    const forecast = []
    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      
      forecast.push({
        date: date.toISOString().split('T')[0],
        temperature: `${20 + Math.random() * 10}`,
        condition: ['晴天', '多云', '小雨', '阴天'][Math.floor(Math.random() * 4)],
        humidity: `${50 + Math.random() * 30}%`
      })
    }

    return {
      content: [
        {
          type: 'text',
          text: `## ${city} 天气预报\n\n` +
                forecast.map(day => 
                  `**${day.date}**: ${day.condition}, 温度: ${day.temperature}°C, 湿度: ${day.humidity}`
                ).join('\n')
        }
      ]
    }
  }

  throw new Error(`未知工具: ${request.params.name}`)
})

// 启动服务器
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Weather MCP服务器已启动')
}

main().catch(console.error)
```

**步骤2：配置MCP服务器**

```json
// ~/.cline/mcp-settings.json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-mcp-server.ts"],
      "env": {},
      "autoApprove": ["get_weather"]
    }
  }
}
```

## 示例4：状态管理最佳实践

### 场景：实现用户偏好设置

**步骤1：创建状态管理器**

```typescript
// src/core/state/UserPreferences.ts
import * as vscode from 'vscode'

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  autoSave: boolean
  maxTokens: number
  preferredModel: string
  notificationSettings: {
    taskComplete: boolean
    errorOccurred: boolean
    toolExecution: boolean
  }
}

export class UserPreferencesManager {
  private static instance: UserPreferencesManager
  private context: vscode.ExtensionContext

  private constructor(context: vscode.ExtensionContext) {
    this.context = context
  }

  static getInstance(context?: vscode.ExtensionContext): UserPreferencesManager {
    if (!UserPreferencesManager.instance && context) {
      UserPreferencesManager.instance = new UserPreferencesManager(context)
    }
    return UserPreferencesManager.instance
  }

  async getPreferences(): Promise<UserPreferences> {
    const saved = this.context.globalState.get<UserPreferences>('userPreferences')
    
    return saved || {
      theme: 'auto',
      autoSave: true,
      maxTokens: 4096,
      preferredModel: 'claude-3-5-sonnet',
      notificationSettings: {
        taskComplete: true,
        errorOccurred: true,
        toolExecution: false
      }
    }
  }

  async updatePreferences(updates: Partial<UserPreferences>): Promise<void> {
    const current = await this.getPreferences()
    const updated = { ...current, ...updates }
    
    await this.context.globalState.update('userPreferences', updated)
    
    // 通知状态变化
    this.emitPreferencesChanged(updated)
  }

  async resetToDefaults(): Promise<void> {
    await this.context.globalState.update('userPreferences', undefined)
  }

  private emitPreferencesChanged(preferences: UserPreferences): void {
    // 实现事件发射逻辑
    // 例如：vscode.EventEmitter
  }
}
```

**步骤2：在Controller中使用**

```typescript
// src/core/controller/index.ts
import { UserPreferencesManager } from '../state/UserPreferences'

export class Controller {
  private userPreferencesManager: UserPreferencesManager

  constructor(context: vscode.ExtensionContext) {
    this.userPreferencesManager = UserPreferencesManager.getInstance(context)
  }

  async getUserPreferences() {
    return await this.userPreferencesManager.getPreferences()
  }

  async updateUserPreferences(updates: Partial<UserPreferences>) {
    await this.userPreferencesManager.updatePreferences(updates)
    // 通知webview更新
    await this.postStateToWebview()
  }
}
```

## 示例5：错误处理与恢复

### 场景：实现健壮的文件操作工具

```typescript
// src/integrations/file-operations.ts
import { ToolIntegration, ToolResult } from '../core/task/types'
import * as vscode from 'vscode'
import * as fs from 'fs/promises'
import * as path from 'path'

export class FileOperationsTool implements ToolIntegration {
  async execute(params: any): Promise<ToolResult> {
    try {
      switch (params.operation) {
        case 'read':
          return await this.readFile(params.path)
        case 'write':
          return await this.writeFile(params.path, params.content)
        case 'delete':
          return await this.deleteFile(params.path)
        case 'list':
          return await this.listDirectory(params.path)
        default:
          throw new Error(`未知操作: ${params.operation}`)
      }
    } catch (error) {
      // 详细的错误处理
      return this.handleError(error, params)
    }
  }

  private async readFile(filePath: string): Promise<ToolResult> {
    const absolutePath = this.resolvePath(filePath)
    
    // 检查文件是否存在
    try {
      await fs.access(absolutePath)
    } catch {
      return {
        success: false,
        error: `文件不存在: ${filePath}`
      }
    }

    // 检查文件大小
    const stats = await fs.stat(absolutePath)
    if (stats.size > 10 * 1024 * 1024) { // 10MB限制
      return {
        success: false,
        error: `文件过大 (${stats.size} bytes)，超过10MB限制`
      }
    }

    const content = await fs.readFile(absolutePath, 'utf-8')
    
    return {
      success: true,
      output: `文件内容 (${filePath}):\n\`\`\`\n${content}\n\`\`\``
    }
  }

  private async writeFile(filePath: string, content: string): Promise<ToolResult> {
    const absolutePath = this.resolvePath(filePath)
    const dirPath = path.dirname(absolutePath)

    // 确保目录存在
    try {
      await fs.mkdir(dirPath, { recursive: true })
    } catch (error) {
      return {
        success: false,
        error: `创建目录失败: ${error.message}`
      }
    }

    // 备份现有文件（如果存在）
    let backupPath: string | null = null
    try {
      await fs.access(absolutePath)
      backupPath = `${absolutePath}.backup-${Date.now()}`
      await fs.copyFile(absolutePath, backupPath)
    } catch {
      // 文件不存在，无需备份
    }

    try {
      await fs.writeFile(absolutePath, content, 'utf-8')
      
      let backupMessage = ''
      if (backupPath) {
        backupMessage = `\n原文件已备份到: ${backupPath}`
      }

      return {
        success: true,
        output: `文件已成功写入: ${filePath}${backupMessage}`
      }
    } catch (error) {
      // 恢复备份（如果存在）
      if (backupPath) {
        try {
          await fs.copyFile(backupPath, absolutePath)
          await fs.unlink(backupPath)
        } catch (restoreError) {
          console.error('恢复备份失败:', restoreError)
        }
      }

      return {
        success: false,
        error: `写入文件失败: ${error.message}`
      }
    }
  }

  private resolvePath(filePath: string): string {
    if (path.isAbsolute(filePath)) {
      return filePath
    }
    
    // 使用当前工作空间根目录
    const workspaceFolders = vscode.workspace.workspaceFolders
    if (workspaceFolders && workspaceFolders.length > 0) {
      return path.join(workspaceFolders[0].uri.fsPath, filePath)
    }
    
    // 使用当前文件所在目录
    const activeEditor = vscode.window.activeTextEditor
    if (activeEditor) {
      return path.join(path.dirname(activeEditor.document.uri.fsPath), filePath)
    }
    
    throw new Error('无法解析文件路径：没有活动工作空间或编辑器')
  }

  private handleError(error: Error, params: any): ToolResult {
    // 记录错误日志
    console.error('文件操作失败:', {
      error: error.message,
      stack: error.stack,
      params
    })

    // 提供用户友好的错误信息
    let userMessage = error.message
    
    if (error.message.includes('ENOENT')) {
      userMessage = '文件或目录不存在'
    } else if (error.message.includes('EACCES')) {
      userMessage = '权限不足，无法访问文件'
    } else if (error.message.includes('ENOSPC')) {
      userMessage = '磁盘空间不足'
    }

    return {
      success: false,
      error: `文件操作失败: ${userMessage}`,
      details: {
        originalError: error.message,
        suggestion: this.getErrorSuggestion(error, params)
      }
    }
  }

  private getErrorSuggestion(error: Error, params: any): string {
    if (error.message.includes('ENOENT') && params.operation === 'read') {
      return '请检查文件路径是否正确，或使用绝对路径'
    } else if (error.message.includes('EACCES')) {
      return '请检查文件权限，或尝试以管理员身份运行'
    } else if (error.message.includes('ENOSPC')) {
      return '请清理磁盘空间，或选择其他存储位置'
    }
    
    return '请检查参数是否正确，或联系系统管理员'
  }
}
```

## 最佳实践总结

### 1. 代码组织
- 遵循单一职责原则
- 使用清晰的目录结构
- 保持模块间的松耦合

### 2. 错误处理
- 始终处理可能的错误
- 提供有意义的错误信息
- 实现适当的恢复机制

### 3. 状态管理
- 使用Controller作为单一事实来源
- 持久化重要状态
- 处理并发访问

### 4. 安全性
- 安全存储API密钥
- 验证用户输入
- 限制资源访问

### 5. 性能优化
- 实现流式处理
- 缓存频繁访问的数据
- 监控资源使用

### 6. 测试
- 编写单元测试
- 测试边界条件
- 模拟外部依赖

### 7. 文档
- 为公共API添加文档
- 提供使用示例
- 记录设计决策

通过遵循这些最佳实践，你可以创建高质量、可维护的Cline扩展功能，为社区做出有价值的贡献。
