# API 选项组件架构

此目录包含 Cline 扩展重构后的 API 选项组件。重构旨在通过将特定于提供商的代码分离到模块化组件中，提高可维护性、代码组织性并降低复杂性。

## 目录结构

```
settings/
├── ApiOptions.tsx               # 渲染特定于提供商的组件的主组件
├── common/                      # 可重用的 UI 组件
│   ├── ApiKeyField.tsx         # 具有标准样式的 API 密钥输入
│   ├── BaseUrlField.tsx        # 具有标准样式的基础 URL 输入
│   ├── ErrorMessage.tsx        # 标准错误消息显示
│   ├── ModelInfoView.tsx       # 模型信息显示
│   └── ModelSelector.tsx       # 模型选择下拉菜单
├── providers/                   # 特定于提供商的组件
│   ├── ClineProvider.tsx       # Cline 配置
│   ├── AnthropicProvider.tsx   # Anthropic 特定配置
│   ├── BedrockProvider.tsx     # AWS Bedrock 配置
│   ├── GeminiProvider.tsx      # Google Gemini 配置
│   ├── MistralProvider.tsx     # Mistral 配置
│   ├── OllamaProvider.tsx      # Ollama 配置
│   ├── OpenAICompatibleProvider.tsx  # OpenAI 兼容 API 配置
│   ├── OpenRouterProvider.tsx  # OpenRouter 配置
│   └── ...
└── utils/                       # 工具函数
    ├── pricingUtils.ts         # 定价格式化工具
    └── providerUtils.ts        # API 配置规范化工具

```

## 架构

### 组件层次结构

```
ApiOptions
└── [ProviderComponent] (基于选定的提供商)
    ├── ApiKeyField (如果需要)
    ├── BaseUrlField (如果需要)
    ├── ModelSelector (如果显示模型选项)
    └── ModelInfoView (如果显示模型选项)
```

### 数据流

1. `ApiOptions` 从扩展状态接收当前的 API 配置
2. 当选择提供商时，它渲染相应的提供商组件
3. 特定于提供商的组件接收 `apiConfiguration` 和 `handleInputChange` 来管理其状态
4. 更改通过 `handleInputChange` 回调传播回扩展

## 添加新提供商

要添加新提供商：

1. 在 `providers` 目录中创建一个新文件，例如 `MyNewProvider.tsx`
2. 使用此模板实现提供商组件：

```tsx
import { ApiConfiguration, myNewProviderModels } from "@shared/api"
import { ApiKeyField } from "../common/ApiKeyField"
import { BaseUrlField } from "../common/BaseUrlField"
import { ModelSelector } from "../common/ModelSelector"
import { ModelInfoView } from "../common/ModelInfoView"
import { normalizeApiConfiguration } from "../utils/providerUtils"

/**
 * MyNewProvider 组件的 Props
 */
interface MyNewProviderProps {
  apiConfiguration: ApiConfiguration
  handleInputChange: (field: keyof ApiConfiguration) => (event: any) => void
  showModelOptions: boolean
  isPopup?: boolean
}

/**
 * MyNewProvider 配置组件
 */
export const MyNewProvider = ({
  apiConfiguration,
  handleInputChange,
  showModelOptions,
  isPopup,
}: MyNewProviderProps) => {
  // 获取规范化配置
  const { selectedModelId, selectedModelInfo } = normalizeApiConfiguration(apiConfiguration)

  return (
    <div>
      {/* 添加特定于提供商的字段 */}
      <ApiKeyField
        value={apiConfiguration?.myNewProviderApiKey || ""}
        onChange={handleInputChange("myNewProviderApiKey")}
        providerName="My New Provider"
        signupUrl="https://mynewprovider.com/signup"
      />

      {/* 可选：如果提供商支持自定义端点，则添加基础 URL 字段 */}
      <BaseUrlField
        value={apiConfiguration?.myNewProviderBaseUrl}
        onChange={handleInputChange("myNewProviderBaseUrl")}
        defaultPlaceholder="https://api.mynewprovider.com"
      />

      {showModelOptions && (
        <>
          <ModelSelector
            models={myNewProviderModels}
            selectedModelId={selectedModelId}
            onChange={handleInputChange("apiModelId")}
            label="Model"
          />

          <ModelInfoView
            selectedModelId={selectedModelId}
            modelInfo={selectedModelInfo}
            isPopup={isPopup}
          />
        </>
      )}
    </div>
  )
}
```

3. 将新的提供商组件导入并添加到 `ApiOptions.tsx`：

```tsx
import { MyNewProvider } from "./providers/MyNewProvider"

// ...

{apiConfiguration && selectedProvider === "mynewprovider" && (
  <MyNewProvider
    apiConfiguration={apiConfiguration}
    handleInputChange={handleInputChange}
    showModelOptions={showModelOptions}
    isPopup={isPopup}
  />
)}
```

4. 将提供商添加到下拉选项：

```tsx
<VSCodeOption value="mynewprovider">My New Provider</VSCodeOption>
```

## 最佳实践

1. **重用通用组件**：使用通用组件以获得一致的 UI 和行为
2. **特定于提供商的逻辑**：将特定于提供商的逻辑保留在提供商组件内
3. **类型安全**：确保所有 props 和 state 都正确类型化
4. **错误处理**：优雅地处理边缘情况，例如缺少配置
5. **文档**：记录任何特定于提供商的行为或要求

## 测试

每个提供商组件都应单独测试，以确保正确渲染并正确处理用户输入。
