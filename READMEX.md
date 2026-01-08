## 编译打包
- npm run install:all
- npm run protos
- npm run check-types && npm run build:webview && npm run lint && node esbuild.mjs --production
- npx @vscode/vsce package --allow-package-secrets sendgrid

## 工具使用

```bash
# 在您的系统上执行 CLI 命令。用于运行测试、构建、git 命令或任何其他终端操作
<execute_command>
  <command>npm run test</command>
  <requires_approval>false</requires_approval>
</execute_command>

# 读取文件内容。分析代码或配置时必不可少
<read_file>
  <path>src/config.json</path>
</read_file>

# 创建或覆盖文件。使用此功能生成模板代码、配置文件或文档
<write_to_file>
  <path>src/components/Button.tsx</path>
  <content>
    // File content goes here...
  </content>
</write_to_file>

# 在目录中的文件中搜索正则表达式模式。非常适合查找 TODO、使用示例或特定代码模式
<search_files>
  <path>src</path>
  <regex>TODO</regex>
  <file_pattern>*.ts</file_pattern>
</search_files>

# 请求用户输入或确认。这使您的工作流程具有交互性，并允许进行人工决策
<ask_followup_question>
  <question>Do you want to deploy to production?</question>
  <options>["Yes", "No"]</options>
</ask_followup_question>

# 控制内置浏览器以与网站或本地服务器交互。可用于测试 Web UI 或抓取数据。
<browser_action>
<action>Action to perform (e.g., launch, click, type, scroll_down, scroll_up, close)</action>
<url>URL to launch the browser at (optional)</url>
<coordinate>x,y coordinates (optional)</coordinate>
<text>Text to type (optional)</text>
</browser_action>

# 从指定URL获取内容，并依据您的提示进行分析。
<web_fetch>
<url>https://example.com/docs</url>
<prompt>Summarize the main points and key takeaways</prompt>
<task_progress>Checklist here (optional)</task_progress>
</web_fetch>

# 执行网络搜索并返回相关结果
<web_search>
<query>latest developments in AI</query>
<allowed_domains>["example.com", "github.com"]</allowed_domains>
<blocked_domains>["ads.com", "spam.com"]</blocked_domains>
<task_progress>Checklist here (optional)</task_progress>
</web_search>
```