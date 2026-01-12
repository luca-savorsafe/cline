# cline 项目 VS Code 插件本地化机制实现总结

## 已完成的工作

### 1. VS Code 插件元数据本地化 ✅
- 创建了 `package.nls.json` 文件（英语默认翻译）
- 创建了 `package.nls.zh-CN.json` 文件（中文简体翻译）
- 更新了 `package.json`，将所有硬编码文本替换为 `%key%` 格式
- 支持的命令标题、描述、walkthrough 文本等都已本地化

### 2. 运行时文本本地化系统 ✅
- 安装了 `i18next` 依赖
- 创建了完整的 i18n 目录结构：
  - `src/i18n/index.ts` - 公共 API
  - `src/i18n/setup.ts` - i18next 初始化和核心功能
  - `src/i18n/locales/en/` - 英语翻译目录
  - `src/i18n/locales/zh-CN/` - 中文翻译目录

### 3. i18n 核心功能 ✅
- `initializeI18n()` - 初始化 i18n 系统
- `t()` - 翻译函数，支持变量插值
- `changeLanguage()` - 动态切换语言
- `getCurrentLanguage()` - 获取当前语言
- `formatLanguage()` - 格式化语言代码

### 4. 扩展入口集成 ✅
- 在 `src/extension.ts` 的 `activate()` 函数中初始化 i18n
- 自动检测 VS Code 环境语言设置
- 支持从全局状态读取用户自定义语言设置

### 5. 示例和文档 ✅
- 创建了 `src/i18n/example-usage.ts` 展示如何迁移代码
- 提供了最佳实践建议

## 翻译内容

### 插件元数据翻译
- 扩展显示名称和描述
- 所有命令标题（New Task, MCP Servers, History, Account, Settings 等）
- Walkthrough 引导教程的所有标题和描述
- 配置标题

### 运行时文本翻译
- 通用文本（欢迎、加载中、错误、成功、确认、取消等）
- 错误消息（命令超时、文件未找到、权限拒绝、网络错误等）
- UI 文本（新建任务、聊天、历史记录、设置、账户、MCP 服务器等）

## 使用方法

### 1. 在代码中使用翻译
```typescript
import { t } from './i18n';

// 基本使用
vscode.window.showErrorMessage(t('errors.command_timeout', { seconds: 10 }));

// UI 文本
const buttonText = t('ui.new_task');

// 确认对话框
const answer = await vscode.window.showInformationMessage(
  t('common.confirmation.delete_task'),
  { modal: true },
  t('common.yes'),
  t('common.no')
);
```

### 2. 切换语言
```typescript
import { changeLanguage } from './i18n';

// 切换到中文
await changeLanguage('zh-CN');

// 切换到英语
await changeLanguage('en');
```

### 3. 获取当前语言
```typescript
import { getCurrentLanguage } from './i18n';

const currentLang = getCurrentLanguage(); // 返回 'en' 或 'zh-CN' 等
```

## 下一步建议

### 1. 逐步迁移现有代码
- 搜索项目中的硬编码文本，逐步替换为 `t()` 函数调用
- 优先迁移用户可见的文本（错误消息、UI 文本、确认对话框等）

### 2. 添加更多语言支持
- 基于现有的 `locales/` 目录结构，添加更多语言翻译
- 参考 Roo-Code 项目的多语言实现

### 3. 完善翻译管理系统
- 创建翻译键的命名规范文档
- 建立翻译审查流程
- 添加翻译键的自动提取工具

### 4. 用户语言设置
- 在插件设置中添加语言选择选项
- 保存用户语言偏好到全局状态
- 监听语言设置变化并实时更新

### 5. 测试验证
- 测试每种语言的插件元数据显示
- 测试运行时文本翻译
- 测试语言切换功能

## 技术细节

### 语言代码映射
系统支持以下语言代码映射：
- `en`, `en-us` → `en` (英语)
- `zh-cn` → `zh-CN` (中文简体)
- `zh-tw` → `zh-TW` (中文繁体)
- `ja` → `ja` (日语)
- `ko` → `ko` (韩语)
- `es` → `es` (西班牙语)
- `de` → `de` (德语)
- `fr` → `fr` (法语)
- `pt-br` → `pt-BR` (葡萄牙语巴西)
- 其他语言默认回退到英语

### 翻译键命名规范
- 使用命名空间组织：`common:`, `errors:`, `ui:`, `commands:`
- 使用点号分隔层次：`errors.command_timeout`
- 变量使用双花括号：`{{seconds}} seconds`

## 优势

1. **完整的本地化覆盖**：从插件元数据到运行时文本
2. **灵活的扩展**：易于添加新语言和新翻译模块
3. **良好的开发体验**：类型安全的翻译键使用
4. **用户友好的体验**：自动跟随系统语言，支持手动切换
5. **遵循最佳实践**：基于 VS Code 原生机制和 i18next 行业标准

## 注意事项

1. 翻译键一旦定义，不应随意更改，以免破坏现有翻译
2. 新添加的翻译键需要同步更新所有语言文件
3. 变量插值要确保所有语言都有相同的变量占位符
4. 复数形式等高级 i18n 功能需要额外配置

---

**实现状态**：✅ 基础框架已完成，可以开始逐步迁移现有代码
**预计迁移时间**：根据代码库大小，可能需要 1-2 周逐步完成
**测试建议**：在开发环境中测试中英文切换，确保显示正常