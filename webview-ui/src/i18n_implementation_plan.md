# 多语言支持实现计划

## 现状分析
1. 已有 i18n.ts 配置和基本的翻译文件
2. 已有 en/translation.json 包含一些基础翻译
3. 需要为 80+ 个文件添加国际化支持

## 实施策略

### 阶段1：扩展翻译文件结构
1. 为每个组件/模块创建命名空间
2. 按照文件结构组织翻译键
3. 保持与现有结构的一致性

### 阶段2：创建翻译键映射
为每个文件创建翻译键，例如：
- `settings.features.subagents.title`
- `settings.features.subagents.description`
- `settings.features.checkpoints.title`
- `settings.features.checkpoints.description`

### 阶段3：修改代码文件
1. 导入 useTranslation 钩子
2. 替换硬编码文本为 t() 函数调用
3. 处理动态文本和插值

### 阶段4：更新所有翻译文件
1. 更新英文翻译文件
2. 创建/更新其他语言翻译文件
3. 验证翻译完整性

## 翻译键命名规范
```
{模块}.{组件}.{元素}.{类型}
示例：
settings.features.subagents.title
settings.features.subagents.description
settings.features.subagents.installButton
```

## 优先级排序
按照需求文档中的优先级：
1. FeatureSettingsSection.tsx (最高优先级)
2. BedrockProvider.tsx
3. SapAiCoreProvider.tsx
4. OpenAICompatible.tsx
5. 其他文件

## 工具支持
1. 使用现有 analyze_i18n_focused.py 脚本帮助提取文本
2. 创建验证脚本检查翻译覆盖率
3. 使用 TypeScript 类型检查确保键存在