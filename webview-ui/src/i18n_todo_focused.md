
**注意**: 本分析专注于 TypeScript/TSX 文件中实际显示给用户的界面文本，忽略技术性字符串。

## 需要国际化的文件 (按优先级排序)

这些文件包含用户界面文本但尚未使用国际化:

### 1. `settings/sections/FeatureSettingsSection.tsx`
- 所有界面文本:
  1. JSX文本: "Enable Background Edit"
  2. JSX文本: "Enable Skills"
  3. JSX文本: "Experimental:"
  4. 段落文本: "Controls how MCP responses are displayed: plain text, rich formatting with links/images, or markdown
							rendering."
  5. 段落文本: "Interval (in messages) to remind Cline about its focus chain checklist (1-100). Lower values
								provide more frequent reminders."
  6. JSX文本: "MCP Display Mode"
  7. 段落文本: "Enforces strict tool use while in plan mode, preventing file edits."
  8. 段落文本: "EXPERIMENTAL & DANGEROUS: This mode disables safety checks and user confirmations. Cline will
							automatically approve all actions without asking. Use with extreme caution."
  9. JSX文本: "Enable Dictation"
  10. 段落文本: "Reasoning effort for the OpenAI family of models(applies to all OpenAI model providers)"
  11. JSX文本: "Enable Focus Chain"
  12. 标签文本: "Focus Chain Reminder Interval"
  13. JSX文本: "To authenticate with Cline or configure an API provider."
  14. 文本: "Enables Skills for reusable, on-demand agent instructions from .cline/skills/ directories."
  15. JSX文本: "Enables websearch and webfetch tools while using the Cline provider."
  16. 段落文本: "Enables extension to save checkpoints of workspace throughout the task. Uses git under the hood which
							may not work well with large workspaces."
  17. JSX文本: "Enable Hooks"
  18. JSX文本: "OpenAI Reasoning Effort"
  19. JSX文本: "Enable Cline Web Tools"
  20. 文本: "Allows cline to work across multiple workspaces."
  21. JSX文本: "Allows cline to work across multiple workspaces."
  22. JSX文本: "Enable Multi-Root Workspace"
  23. JSX文本: "Enable YOLO Mode"
  24. JSX文本: "Allows execution of hooks from .clinerules/hooks/ directory."
  25. 文本: "Allows execution of hooks from .clinerules/hooks/ directory."
  26. JSX文本: "Reasoning effort for the OpenAI family of models(applies to all OpenAI model providers)"
  27. 文本: "Allows editing files in background without opening the diff view in editor."
  28. JSX文本: "Focus Chain Reminder Interval"
  29. JSX文本: "Enable Parallel Tool Calling"
  30. 文本: "Allows Cline to spawn subprocesses to handle focused tasks like exploring large codebases,
									keeping your main context clean."
  31. 标签文本: "MCP Display Mode"
  32. 段落文本: "Enables enhanced task progress tracking and automatic focus chain list management throughout
								tasks."
  33. JSX文本: ", then run"
  34. 段落文本: "Hooks are not yet supported on Windows. This feature is currently available on macOS and Linux
								only."
  35. JSX文本: "This setting is managed by your organization's remote configuration"
  36. 段落文本: "Enables speech-to-text transcription using your Cline account. Uses the Aqua Voice's Avalon model,
								at $0.0065 credits per minute of audio processed. 5 minutes max per message."
  37. JSX文本: "Install Now"
  38. JSX文本: "Enable strict plan mode"
  39. JSX文本: "Enable Checkpoints"
  40. JSX文本: "cline auth"
  41. JSX文本: "Enable Native Tool Call"
  42. JSX文本: "Enable Auto Compact"
  43. 链接文本: "Learn more"
  44. 标签文本: "OpenAI Reasoning Effort"
  45. 段落文本: "Enables websearch and webfetch tools while using the Cline provider."
  46. JSX文本: "Enables Skills for reusable, on-demand agent instructions from .cline/skills/ directories."
  47. JSX文本: "npm install -g cline"
  48. JSX文本: "Allows editing files in background without opening the diff view in editor."
  49. 文本: "Allows models to call multiple tools in a single response. Automatically enabled for GPT-5 models."
  50. JSX文本: "Cline for CLI is required for subagents. Install it with:"
  51. 段落文本: "Uses the model's native tool calling API instead of XML-based tool parsing. This will improve
							performance for supported models."
  52. JSX文本: "Enforces strict tool use while in plan mode, preventing file edits."
  53. JSX文本: "Learn more"
  54. 文本: "Experimental:"
  55. JSX文本: "Allows models to call multiple tools in a single response. Automatically enabled for GPT-5 models."

### 2. `settings/providers/BedrockProvider.tsx`
- 所有界面文本:
  1. JSX文本: "AWS Secret Key"
  2. JSX文本: "Use global inference profile"
  3. placeholder: "Enter Bedrock Api Key"
  4. JSX文本: "Base Inference Model"
  5. 文本: "AWS Session Token"
  6. JSX文本: "AWS Access Key"
  7. JSX文本: "Select a model..."
  8. JSX文本: "AWS Profile Name"
  9.  文本: "AWS Profile Name"
  10. 文本: "AWS Region"
  11. placeholder: "Enter Access Key..."
  12. placeholder: "Enter custom model ID..."
  13. JSX文本: "Use custom VPC endpoint"
  14. placeholder: "Enter profile name (default if empty)"
  15. JSX文本: "Use cross-region inference"
  16. JSX文本: "AWS Profile"
  17. placeholder: "Enter Secret Key..."
  18. placeholder: "Enter VPC Endpoint URL (optional)"
  19. 文本: "AWS Secret Key"
  20. JSX文本: "This setting is managed by your organization's remote configuration"
  21. 文本: "AWS Bedrock Api Key"
  23. JSX文本: "AWS Session Token"
  24. 文本: "Base Inference Model"
  25. JSX文本: "Model ID"
  26. JSX文本: "API Key"
  27. 段落文本: "Select "Custom" when using the Application Inference Profile in Bedrock. Enter the Application
								Inference Profile ARN in the Model ID field."
  28. JSX文本: "AWS Region"
  29. JSX文本: "AWS Bedrock Api Key"
  30. 文本: "Model ID"
  31. JSX文本: "AWS Credentials"
  32. JSX文本: "Use prompt caching"
  33. JSX文本: "Select a region..."
  34. 文本: "AWS Access Key"
  35. placeholder: "Enter Session Token..."

### 3. `settings/providers/SapAiCoreProvider.tsx`
- 所有界面文本:
  1. placeholder: "Enter AI Core Resource Group..."
  2. 文本: "AI Core Client Secret"
  3. 文本: "Orchestration Mode"
  4. placeholder: "Enter AI Core Auth URL..."
  5. JSX文本: "Client Id is set. To change it, please re-enter the value."
  6. 文本: "Unable to fetch models from SAP AI Core service instance. Please check your SAP AI Core
										configuration or ensure your deployments are deployed and running in the service instance"
  7. 文本: "AI Core Base URL"
  8. JSX文本: "When enabled, provides access to all available models without requiring individual deployments."
  9. JSX文本: "Orchestration Mode"
  10. placeholder: "Enter AI Core Client Secret..."
  11. JSX文本: "Loading models..."
  12. 文本: "Loading models..."
  13. JSX文本: "AI Core Client Secret"
  14. 段落文本: "Client Secret is set. To change it, please re-enter the value."
  15. JSX文本: "Client Secret is set. To change it, please re-enter the value."
  16. aria-label: "Orchestration Mode"
  17. placeholder: "Select a model..."
  18. 文本: "AI Core Client Id"
  19. JSX文本: "AI Core Resource Group"
  20. 文本: "Please configure your SAP AI Core credentials to see available models."
  21. JSX文本: "Please configure your SAP AI Core credentials to see available models."
  22. JSX文本: "These credentials are stored locally and only used to make API requests from this extension."
  23. JSX文本: "You can find more information about SAP AI Core API access here."
  24. 文本: "AI Core Resource Group"
  25. JSX文本: "AI Core Auth URL"
  26. JSX文本: "When disabled, provides access only to deployed models in your AI Core service instance."
  27. JSX文本: "AI Core Client Id"
  28. 文本: "AI Core Auth URL"
  29. JSX文本: "AI Core Base URL"
  30. 段落文本: "Client Id is set. To change it, please re-enter the value."
  31. placeholder: "Enter AI Core Base URL..."
  32. label: "Orchestration Mode"
  33. placeholder: "Enter AI Core Client Id..."

### 4. `settings/providers/OpenAICompatible.tsx`
- 所有界面文本:
  1. 文本: "Base URL"
  2. 文本: "Input Price / 1M tokens"
  3. 文本: "Output Price / 1M tokens"
  4. JSX文本: "Context Window Size"
  5. JSX文本: "Input Price / 1M tokens"
  6. placeholder: "Header name"
  7. placeholder: "Header value"
  8. 文本: "Max Output Tokens"
  9. 文本: "Model Configuration"
  10. JSX文本: "Add Header"
  11. label: "Set Azure API version"
  12. JSX文本: "Max Output Tokens"
  13. JSX文本: "Model Configuration"
  14. 文本: "Context Window Size"
  15. JSX文本: "This setting is managed by your organization's remote configuration"
  16. 文本: "Note:"
  17. JSX文本: "Base URL"
  18. JSX文本: "Model ID"
  19. JSX文本: "Enable R1 messages format"
  20. 文本: "Custom Headers"
  21. JSX文本: "Use Azure Identity Authentication"
  22. 文本: "Model ID"
  23. JSX文本: "Output Price / 1M tokens"
  24. JSX文本: "Supports Images"
  25. JSX文本: "Custom Headers"

### 5. `components/cline-rules/ClineRulesToggleModal.tsx`
- 所有界面文本:
  1. 文本: "Global Skills"
  2. 文本: "Global Rules"
  3. 文本: "Hook toggling is not supported on Windows. Hooks can be created, edited, and deleted,
											but cannot be enabled/disabled and will not execute."
  4. JSX文本: "Workspace Rules"
  5. 文本: "Enterprise Workflows"
  6. 文本: "Global Hooks"
  7. 文本: "Enterprise Rules"
  8.  JSX文本: "Global Workflows"
  9.  文本: "Global Workflows"
  10. JSX文本: "Workspace Workflows"
  11. 文本: "Workspace Skills"
  12. JSX文本: "Enterprise Workflows"
  13. 段落文本: "Hooks allow you to execute custom scripts at specific points in Cline's execution lifecycle,
									enabling automation and integration with external tools."
  14. JSX文本: "Workspace Skills"
  15. JSX文本: "Global Rules"
  16. 文本: "Workspace Workflows"
  17. JSX文本: "Global Skills"
  18. JSX文本: "Enterprise Rules"
  19. JSX文本: "Global Hooks"
  20. JSX文本: "Manage Cline Rules & Workflows"
  21. 文本: "Workspace Rules"

### 6. `settings/sections/BrowserSettingsSection.tsx`
- 所有界面文本:
  1. 段落文本: "Space-separated arguments to pass to the browser executable."
  3. JSX文本: "Disable browser tool usage"
  4. JSX文本: "Viewport size"
  5. JSX文本: "Prevent Cline from using browser actions (e.g. launch, click, type)."
  6. JSX文本: "Space-separated arguments to pass to the browser executable."
  7. 段落文本: "Leave blank to auto-detect."
  8.  JSX文本: "Not connected"
  9.  标签文本: "Chrome Executable Path (Optional)"
  10. JSX文本: "Custom Browser Arguments (Optional)"
  11. 标签文本: "Custom Browser Arguments (Optional)"
  12. JSX文本: "Use remote browser connection"
  13. 段落文本: "Set the size of the browser viewport for screenshots and interactions."
  14. 标签文本: "Viewport size"
  15. JSX文本: "Chrome Executable Path (Optional)"
  16. 段落文本: "Prevent Cline from using browser actions (e.g. launch, click, type)."
  17. JSX文本: "Checking connection..."
  18. JSX文本: "Leave blank to auto-detect."
  19. JSX文本: "Set the size of the browser viewport for screenshots and interactions."

### 7. `settings/providers/OcaProvider.tsx`
- 所有界面文本:
  1. label: "Custom Base URL (optional)"
  2. 链接文本: "Provide feedback"
  3. JSX文本: "I’m an Oracle Employee"
  4. 文本: "Unknown User"
  5. JSX文本: "Unknown User"
  6. 文本: "Connecting…"
  7. JSX文本: "Failed to refresh models. Check your session or network."
  8. label: "Oracle employment"
  9.  JSX文本: "Connecting…"
  10. JSX文本: "Sign in with Oracle Code Assist"
  11. aria-label: "Oracle employment"
  12. JSX文本: "Signed in"
  13. 文本: "Signed in"
  14. 文本: "Have an idea for Oracle Code Assist?"
  15. JSX文本: "Have an idea for Oracle Code Assist?"
  16. 文本: "Failed to refresh models. Check your session or network."
  17. JSX文本: "Sign in again"
  18. JSX文本: "Log out"
  19. JSX文本: "Provide feedback"
  20. JSX文本: "quickstart guide"

### 8. `settings/sections/TerminalSettingsSection.tsx`
- 所有界面文本:
  1. JSX文本: "Default Terminal Profile"
  2. JSX文本: "Having terminal issues?"
  3. 标签文本: "Default Terminal Profile"
  4. JSX文本: "Shell integration timeout (seconds)"
  5. 段落文本: "Set how long Cline waits for shell integration to activate before executing commands. Increase this
							value if you experience terminal connection timeouts."
  6. 链接文本: "Complete Troubleshooting Guide"
  7. JSX文本: "Terminal Execution Mode"
  8. 段落文本: "Choose whether Cline runs commands in the VS Code terminal or a background process."
  9. JSX文本: "Complete Troubleshooting Guide"
  10. JSX文本: "VS Code Terminal"
  11. placeholder: "Enter timeout in seconds"
  12. JSX文本: "Terminal Quick Fixes"
  13. JSX文本: "Background Exec"
  14. JSX文本: "Select the default terminal Cline will use. 'Default' uses your VSCode global setting."
  15. 段落文本: "When enabled, Cline will reuse existing terminal windows that aren't in the current working directory.
							Disable this if you experience issues with task lockout after a terminal command."
  16. 标签文本: "Terminal Execution Mode"
  17. 段落文本: "Select the default terminal Cline will use. 'Default' uses your VSCode global setting."
  18. JSX文本: "Choose whether Cline runs commands in the VS Code terminal or a background process."
  19. 标签文本: "Shell integration timeout (seconds)"
  20. JSX文本: "Enable aggressive terminal reuse"
  21. 链接文本: "Terminal Quick Fixes"

### 9. `components/common/Demo.tsx`
- 所有界面文本:
  1. JSX文本: "Custom Title"
  2. label: "Match Case"
  3. JSX文本: "A Custom Header Title"
  4. aria-label: "Use Regular Expression"
  5. JSX文本: "Panel View 1"
  6. JSX文本: "Radio 1"
  7. aria-label: "Match Case"
  8. 标题文本: "Hello World!"
  9. JSX文本: "Another Custom Title"
  10. aria-label: "Match Whole Word"
  11. label: "Match Whole Word"
  12. JSX文本: "Radio 2"
  13. JSX文本: "Option 1"
  14. JSX文本: "Title Is Custom"
  15. JSX文本: "Panel View 2"
  16. label: "Use Regular Expression"
  17. JSX文本: "Option 2"
  18. JSX文本: "Hello World!"
  19. JSX文本: "Howdy!"
  20. placeholder: "Text Area"

### 10. `components/onboarding/OnboardingView.tsx`
- 所有界面文本:
  1. 标题文本: "other options"
  2. JSX文本: "Model Overview:"
  3. 文本: "Model Overview:"
  4. JSX文本: "Support:"
  5. JSX文本: "Speed:"
  6. placeholder: "Search model..."
  7. JSX文本: "You can change this later in settings"
  8. JSX文本: "Context:"
  9.  文本: "Context:"
  10. JSX文本: "other options"
  11. 文本: "Speed:"
  12. 文本: "Support:"

### 11. `settings/providers/OllamaProvider.tsx`
- 所有界面文本:
  1. JSX文本: "Maximum time in milliseconds to wait for API responses before timing out."
  2. label: "Use custom base URL"
  3. placeholder: "Default: 30000 (30 seconds)"
  4. text: "Optional API key for authenticated Ollama instances or cloud services. Leave empty for local installations."
  5. JSX文本: "Model Context Window"
  6. JSX文本: "quickstart guide."
  7. 段落文本: "Unable to fetch models from Ollama server. Please ensure Ollama is running and accessible, or enter the model
					ID manually above."
  8. 文本: "Note:"
  9. 段落文本: "Maximum time in milliseconds to wait for API responses before timing out."
  10. placeholder: "Enter API Key (optional)..."
  11. JSX文本: "Request Timeout (ms)"
  12. 文本: "Request Timeout (ms)"
  13. placeholder: "Default: http://localhost:11434"
  14. 文本: "Model Context Window"

### 12. `components/settings/OpenRouterModelPicker.tsx`
- 所有界面文本:
  1. JSX文本: "Using OpenRouter preset:"
  2. placeholder: "Search and select a model..."
  3. JSX文本: "Thinking Level"
  4. aria-label: "Clear search"
  5. label: "Clear search"
  7. 文本: "Thinking Level"
  8.  JSX文本: "OpenRouter."
  10. JSX文本: "Model info and pricing will depend on your preset configuration."

### 13. `settings/providers/QwenCodeProvider.tsx`
- 所有界面文本:
  1. JSX文本: "2. Authenticate using your account"
  2. JSX文本: "To get started:"
  3. JSX文本: "Setup Instructions"
  4. 文本: "Qwen Code is an OAuth-based API that requires authentication through the official Qwen client. You'll need to set
				up OAuth credentials first."
  5. 文本: "Path to your Qwen OAuth credentials file. Use ~/.qwen/oauth_creds.json or provide a custom path."
  6. 标题文本: "Qwen Code API Configuration"
  7. JSX文本: "OAuth Credentials Path"
  8. JSX文本: "1. Install the official Qwen client"
  9. JSX文本: "3. OAuth credentials will be stored automatically"
  11. JSX文本: "Qwen Code API Configuration"
  12. JSX文本: "Path to your Qwen OAuth credentials file. Use ~/.qwen/oauth_creds.json or provide a custom path."

### 14. `settings/common/ModelInfoView.tsx`
- 所有界面文本:
  1. JSX文本: "Output:"
  2. JSX文本: "Prompt Caching"
  3. JSX文本: "Context:"
  4. 文本: "Tiered Pricing:"
  5. 文本: "Input:"
  6. 文本: "Output:"
  7. JSX文本: "Cache Writes"
  8. JSX文本: "Provider Routing"
  9.  JSX文本: "Cache Reads"
  10. JSX文本: "Input:"
  11. JSX文本: "Tiered Pricing:"

### 15. `tabs/marketplace/McpMarketplaceView.tsx`
- 所有界面文本:
  1. JSX文本: "All Categories"
  2. placeholder: "Search MCPs..."
  3. 文本: "Filter:"
  4. JSX文本: "GitHub Stars"
  5. aria-label: "Clear search"
  6. JSX文本: "Your organization has pre-configured the available MCP servers"
  7. label: "Clear search"
  8. 文本: "Your organization has pre-configured the available MCP servers"
  9. 文本: "Sort:"
  10. JSX文本: "Sort:"
  11. JSX文本: "Filter:"
  12. JSX文本: "Most Installs"

### 16. `settings/providers/LMStudioProvider.tsx`
- 所有界面文本:
  1. placeholder: "Default: http://localhost:1234"
  2. label: "Use custom base URL"
  3. JSX文本: "lms server start"
  4. JSX文本: "quickstart guide."
  5. title: "Not editable - the value is returned by the connected endpoint"
  6. 文本: "Note:"
  7. JSX文本: "Context Window"
  8. JSX文本: "local server"
  9. 文本: "Context Window"
  10. JSX文本: "LM Studio allows you to run models locally on your computer. For instructions on how to get started, see their"

### 17. `installed/server-row/ServerRow.tsx`
- 所有界面文本:
  1. title: "Restart Server"
  2. JSX文本: "No tools found"
  3. JSX文本: "Auto-approve all tools"
  4. title: "Delete Server"
  5. 文本: "No tools found"
  6. 文本: "No resources found"
  7. JSX文本: "This server can't be disabled because it is enabled by your organization"
  8. 标签文本: "Request Timeout"
  9. JSX文本: "No resources found"
  10. JSX文本: "Request Timeout"

### 18. `components/chat/TaskFeedbackButtons.tsx`
- 所有界面文本:
  1. aria-label: "This was helpful"
  2. title: "Report a bug"
  3. label: "This was helpful"
  4. label: "This wasn"
  5. title: "This was helpful"
  6. title: "This wasn"
  7. label: "Report a bug"
  8. aria-label: "This wasn"
  9. aria-label: "Report a bug"

### 19. `components/common/CheckpointControls.tsx`
- 所有界面文本:
  1. JSX文本: "Deletes messages after this point (does not affect workspace)"
  2. JSX文本: "Restore Task and Workspace"
  3. JSX文本: "Restores the task and your project's files back to a snapshot taken at this point"
  4. JSX文本: "Restores your project's files to a snapshot taken at this point (task may become out of sync)"
  5. JSX文本: "Restore Task Only"
  6. JSX文本: "Restore Workspace Only"
  7. 段落文本: "Restores the task and your project's files back to a snapshot taken at this point"
  8. 段落文本: "Restores your project's files to a snapshot taken at this point (task may become out of sync)"
  9. 段落文本: "Deletes messages after this point (does not affect workspace)"

### 20. `settings/providers/VertexProvider.tsx`
- 所有界面文本:
  1. 文本: "Google Cloud Region"
  2. JSX文本: "To use Google Cloud Vertex AI, you need to"
  3. placeholder: "Enter Project ID..."
  4. JSX文本: "Thinking Level"
  5. 文本: "Google Cloud Project ID"
  6. JSX文本: "Google Cloud Project ID"
  7. JSX文本: "Select a region..."
  8. 文本: "Thinking Level"
  9. JSX文本: "Google Cloud Region"

### 21. `tabs/add-server/AddRemoteServerForm.tsx`
- 所有界面文本:
  1. JSX文本: "Server URL"
  2. 标签文本: "Transport Type"
  3. placeholder: "mcp-server"
  4. JSX文本: "here."
  5. JSX文本: "Server Name"
  6. JSX文本: "Transport Type"
  7. JSX文本: "SSE (Legacy)"
  8. JSX文本: "Edit Configuration"
  9. JSX文本: "Streamable HTTP"

### 22. `components/common/WhatsNewModal.tsx`
- 所有界面文本:
  1. 链接文本: "Learn more"
  3. JSX文本: "Sign Up with Parrot"
  4. JSX文本: "Skills:"
  5. JSX文本: "Web Search:"
  6. JSX文本: "Improved websearch tooling in Parrot provider."
  7. JSX文本: "Learn more"
  8. 按钮文本: "Sign Up with Parrot"

### 23. `components/common/TelemetryBanner.tsx`
- 所有界面文本:
  1. aria-label: "Close banner and enable telemetry"
  2. 标题文本: "Help Improve Cline"
  3. 段落文本: "Cline collects error and usage data to help us fix bugs and improve the extension. No code, prompts, or personal
				information is ever sent."
  4. JSX文本: "(and access experimental features)"
  5. label: "Close banner and enable telemetry"
  6. JSX文本: "Help Improve Cline"
  7. JSX文本: "You can turn this setting off in"
  8. 文本: "You can turn this setting off in"

### 24. `components/common/CheckmarkControl.tsx`
- 所有界面文本:
  1. JSX文本: "Restore Files & Task"
  2. 段落文本: "Restores your project's files back to a snapshot taken at this point (use "Compare" to
											see what will be reverted)"
  3. JSX文本: "Restore Task Only"
  4. JSX文本: "Deletes messages after this point (does not affect workspace files)"
  5. 段落文本: "Deletes messages after this point (does not affect workspace files)"
  6. JSX文本: "Restore Files"
  7. JSX文本: "Restores your project's files and deletes all messages after this point"
  8. 段落文本: "Restores your project's files and deletes all messages after this point"

### 25. `components/history/HistoryPreview.tsx`
- 所有界面文本:
  1. JSX文本: "No recent tasks"
  2. label: "View all history"
  3. JSX文本: "Recent Tasks"
  4. JSX文本: "View All"
  5. 文本: "Recent Tasks"
  6. aria-label: "View all history"
  7. 文本: "View All"
  8. 文本: "No recent tasks"

### 26. `settings/providers/OcaModelPicker.tsx`
- 所有界面文本:
  1. JSX文本: "I acknowledge and agree"
  2. 标题文本: "Disclaimer: Prohibited Data Submission"
  4. 标签文本: "Reasoning Effort"
  5. JSX文本: "Acknowledgement Required"
  6. JSX文本: "Disclaimer: Prohibited Data Submission"
  7. JSX文本: "Reasoning Effort"
  8. 标题文本: "Acknowledgement Required"

### 27. `settings/providers/OpenRouterProvider.tsx`
- 所有界面文本:
  1. JSX文本: "This key is stored locally and only used to make API requests from this extension."
  2. JSX文本: "Get OpenRouter API Key"
  3. JSX文本: "Loading..."
  4. 文本: "OpenRouter API Key"
  5. JSX文本: "OpenRouter API Key"
  6. 段落文本: "This key is stored locally and only used to make API requests from this extension."
  7. placeholder: "Enter API Key..."
  8. 文本: "Loading..."

### 28. `components/settings/GroqModelPicker.tsx`
- 所有界面文本:
  1. placeholder: "Search and select a model..."
  3. aria-label: "Clear search"
  5. label: "Clear search"

### 29. `components/settings/HicapModelPicker.tsx`
- 所有界面文本:
  1. placeholder: "Search and select a model..."
  2. 文本: "Model ID"
  3. aria-label: "Clear search"
  5. JSX文本: "Model ID"
  6. label: "Clear search"

### 30. `components/settings/RequestyModelPicker.tsx`
- 所有界面文本:
  1. JSX文本: "Requesty."
  3. placeholder: "Search and select a model..."
  5. aria-label: "Clear search"
  6. label: "Clear search"

### 31. `components/settings/BasetenModelPicker.tsx`
- 所有界面文本:
  1. JSX文本: "Baseten."
  2. placeholder: "Search and select a model..."
  4. aria-label: "Clear search"
  5. label: "Clear search"

### 32. `settings/providers/LiteLlmProvider.tsx`
- 所有界面文本:
  2. placeholder: "Default: noop"
  3. JSX文本: "quickstart guide"
  4. JSX文本: "Base URL (optional)"
  5. 文本: "API Key"
  6. JSX文本: "thinking mode configuration"
  7. 文本: "Base URL (optional)"

### 33. `tabs/installed/ConfigureServersView.tsx`
- 所有界面文本:
  1. JSX文本: "See a demo here."
  2. JSX文本: "Model Context Protocol"
  3. JSX文本: "community-made servers"
  4. JSX文本: "Advanced MCP Settings"
  5. JSX文本: "Your organization manages some MCP servers"
  6. 文本: "Your organization manages some MCP servers"
  7. JSX文本: "Configure MCP Servers"

### 34. `src/context/ExtensionStateContext.tsx`
- 所有界面文本:
  1. JSX文本: "liteLlmModels: Record"
  2. JSX文本: "basetenModels: Record"
  3. JSX文本: "groqModels: Record"
  4. JSX文本: "huggingFaceModels: Record"
  5. JSX文本: "hicapModels: Record"
  6. JSX文本: "vercelAiGatewayModels: Record"

### 35. `components/settings/VercelModelPicker.tsx`
- 所有界面文本:
  1. placeholder: "Search and select a model..."
  2. aria-label: "Clear search"
  4. label: "Clear search"
  5. JSX文本: "Vercel AI Gateway."

### 36. `components/cline-rules/HookRow.tsx`
- 所有界面文本:
  1. title: "Delete hook file"
  2. label: "Delete hook file"
  3. title: "Edit hook file"
  4. label: "Edit hook file"
  5. aria-label: "Delete hook file"
  6. aria-label: "Edit hook file"

### 37. `components/chat/SlashCommandMenu.tsx`
- 所有界面文本:
  1. aria-label: "Slash commands"
  2. 文本: "No matching commands found"
  3. label: "Slash commands"
  5. JSX文本: "No matching commands found"

### 38. `components/common/BannerCarousel.tsx`
- 所有界面文本:
  1. label: "Previous banner"
  2. aria-label: "Next banner"
  3. label: "Dismiss all banners"
  4. aria-label: "Previous banner"
  5. aria-label: "Dismiss all banners"
  6. label: "Next banner"

### 39. `settings/providers/XaiProvider.tsx`
- 所有界面文本:
  1. JSX文本: "High effort may produce more thorough analysis but takes longer and uses more tokens."
  2. JSX文本: "Modify reasoning effort"
  3. 文本: "Note:"
  4. 文本: "Reasoning Effort"
  5. 段落文本: "High effort may produce more thorough analysis but takes longer and uses more tokens."
  6. JSX文本: "Reasoning Effort"

### 40. `settings/providers/MiniMaxProvider.tsx`
- 所有界面文本:
  1. 文本: "MiniMax Entrypoint"
  2. JSX文本: "Select the API endpoint according to your region:"
  3. JSX文本: "MiniMax Entrypoint"
  5. JSX文本: "for all other locations."

### 41. `components/settings/HuggingFaceModelPicker.tsx`
- 所有界面文本:
  2. placeholder: "Search models..."
  3. aria-label: "Clear search"
  5. label: "Clear search"

### 42. `components/settings/OllamaModelPicker.tsx`
- 所有界面文本:
  2. placeholder: "Search and select a model..."
  3. aria-label: "Clear search"
  5. label: "Clear search"

### 43. `components/chat/ServersToggleModal.tsx`
- 所有界面文本:
  1. JSX文本: "MCP Servers"
  2. JSX文本: "Manage MCP Servers"
  3. 文本: "MCP Servers"
  4. aria-label: "Go to MCP server settings"
  5. label: "Go to MCP server settings"

### 44. `settings/sections/DebugSection.tsx`
- 所有界面文本:
  1. JSX文本: "Reset Global State"
  2. JSX文本: "This will reset all global state and secret storage in the extension."
  3. JSX文本: "Reset Onboarding State"
  4. JSX文本: "Reset Workspace State"
  5. 段落文本: "This will reset all global state and secret storage in the extension."

### 45. `settings/providers/MoonshotProvider.tsx`
- 所有界面文本:
  1. 文本: "Moonshot Entrypoint"
  2. text: "This key is stored locally and only used to make API requests from this extension."
  3. JSX文本: "Moonshot Entrypoint"

### 46. `settings/providers/HuggingFaceProvider.tsx`
- 所有界面文本:
  1. JSX文本: "Get your API key here"
  2. 链接文本: "Get your API key here"
  3. JSX文本: "Hugging Face API Key"
  4. 文本: "Hugging Face API Key"
  5. placeholder: "Enter API Key..."

### 47. `settings/providers/ClaudeCodeProvider.tsx`
- 所有界面文本:
  1. placeholder: "Default: claude"
  2. 段落文本: "Path to the Claude Code CLI."
  3. JSX文本: "Path to the Claude Code CLI."
  4. 文本: "Claude Code CLI Path"
  5. JSX文本: "Claude Code CLI Path"

### 48. `settings/providers/ZAiProvider.tsx`
- 所有界面文本:
  1. 段落文本: "Please select the appropriate API entrypoint based on your location. If you are in China, choose open.bigmodel.cn
				. Otherwise, choose api.z.ai."
  4. 文本: "Z AI Entrypoint"
  5. JSX文本: "Z AI Entrypoint"

### 49. `mcp/chat-display/ImagePreview.tsx`
- 所有界面文本:
  1. title: "Something went wrong displaying this image"
  2. 文本: "Failed to load image"
  3. JSX文本: "Failed to load image"
  4. JSX文本: "Click to open in browser"
  5. 文本: "Click to open in browser"

### 50. `components/settings/SubagentOutputLineLimitSlider.tsx`
- 所有界面文本:
  1. 标签文本: "Subagent output limit"
  2. JSX文本: "Subagent output limit"
  3. JSX文本: "Maximum number of lines to include in output from CLI subagents. Truncates middle to save tokens."
  4. 段落文本: "Maximum number of lines to include in output from CLI subagents. Truncates middle to save tokens."

### 51. `components/cline-rules/RuleRow.tsx`
- 所有界面文本:
  1. label: "Delete rule file"
  2. aria-label: "Delete rule file"
  3. JSX文本: "Searches recursively for all AGENTS.md files in the workspace when a top-level AGENTS.md exists"
  4. title: "Delete rule file"

### 52. `components/cline-rules/NewRuleRow.tsx`
- 所有界面文本:
  1. label: "Select hook type to create"
  2. JSX文本: "Select hook type to create"
  3. aria-label: "Select hook type to create"
  4. 标签文本: "Select hook type to create"

### 53. `components/chat/UserMessage.tsx`
- 所有界面文本:
  1. label: "Restore Chat"
  2. title: "Restore both the chat and workspace files to this checkpoint and send your edited message"
  3. label: "Restore All"
  4. title: "Restore just the chat to this checkpoint and send your edited message"

### 54. `components/common/AlertDialog.tsx`
- 所有界面文本:
  1. description: "You have unsaved changes. Are you sure you want to discard them?"
  2. text: "Discard Changes"
  3. text: "Save & Continue"
  4. title: "Unsaved Changes"

### 55. `settings/sections/AboutSection.tsx`
- 所有界面文本:
  1. JSX文本: "Community & Support"
  2. 段落文本: "An AI assistant that can use your CLI and Editor. Cline can handle complex software development tasks
						step-by-step with tools that let him create & edit files, explore large projects, use the browser, and
						execute terminal commands (after you grant permission)."
  4. 标题文本: "Community & Support"

### 56. `settings/sections/GeneralSettingsSection.tsx`
- 所有界面文本:
  1. JSX文本: "telemetry overview"
  2. JSX文本: "Allow error and usage reporting"
  3. JSX文本: "This setting is managed by your organization's remote configuration"
  4. JSX文本: "privacy policy"

### 57. `settings/sections/ApiConfigurationSection.tsx`
- 所有界面文本:
  1. 段落文本: "Switching between Plan and Act mode will persist the API and model used in the previous mode. This may be
						helpful e.g. when using a strong reasoning model to architect a plan for a cheaper coding model to act on."
  2. JSX文本: "Use different models for Plan and Act modes"
  3. JSX文本: "Plan Mode"
  4. JSX文本: "Act Mode"

### 58. `settings/providers/GeminiProvider.tsx`
- 所有界面文本:
  1. JSX文本: "Thinking Level"
  2. 文本: "Thinking Level"
  3. placeholder: "Default: https://generativelanguage.googleapis.com"
  4. label: "Use custom base URL"

### 59. `settings/providers/VercelAIGatewayProvider.tsx`
- 所有界面文本:
  1. JSX文本: "Vercel AI Gateway API Key"
  2. JSX文本: "signing up here."
  3. 文本: "Vercel AI Gateway API Key"
  4. placeholder: "Enter API Key..."

### 60. `settings/providers/AskSageProvider.tsx`
- 所有界面文本:
  1. placeholder: "Enter AskSage API URL..."
  2. JSX文本: "AskSage API URL"
  3. text: "This key is stored locally and only used to make API requests from this extension."
  4. 文本: "AskSage API URL"

### 61. `settings/providers/DifyProvider.tsx`
- 所有界面文本:
  1. 段落文本: "Dify is a platform that provides access to various AI models through a unified API. Configure your Dify
						instance URL and API key to get started."
  2. JSX文本: "Base URL"
  3. 文本: "Base URL"
  4. JSX文本: "The model selection is handled within your Dify application configuration."

### 63. `mcp/chat-display/LinkPreview.tsx`
- 所有界面文本:
  1. 文本: "Click to open in browser"
  2. JSX文本: "Click to open in browser"
  3. title: "Something went wrong displaying this link preview"

### 64. `tabs/marketplace/McpSubmitCard.tsx`
- 所有界面文本:
  2. JSX文本: "Submit MCP Server"
  4. 标题文本: "Submit MCP Server"

### 65. `tabs/add-server/AddLocalServerForm.tsx`
- 所有界面文本:
  2. JSX文本: "here."
  3. JSX文本: "Add a local MCP server by configuring it in"

### 66. `components/settings/SapAiCoreModelPicker.tsx`
- 所有界面文本:
  1. JSX文本: "── Not Deployed Models ──"
  2. JSX文本: "── Deployed Models ──"
  3. placeholder: "Select a model..."

### 67. `components/settings/UseCustomPromptCheckbox.tsx`
- 所有界面文本:
  1. JSX文本: "A system prompt optimized for smaller context window (e.g. 8k or less)."
  2. JSX文本: "Use compact prompt"
  3. JSX文本: "Does not support Mcp and Focus Chain"

### 68. `components/settings/TerminalOutputLineLimitSlider.tsx`
- 所有界面文本:
  1. JSX文本: "Terminal output limit"
  2. 标签文本: "Terminal output limit"
  3. 段落文本: "Maximum number of lines to include in terminal output when executing commands. When exceeded, lines will be
				removed from the middle, saving tokens."

### 69. `settings/providers/HicapProvider.tsx`
- 所有界面文本:
  1. JSX文本: "Hicap API Key"
  2. 文本: "Hicap API Key"
  3. placeholder: "Enter API Key..."

### 70. `settings/providers/TogetherProvider.tsx`
- 所有界面文本:
  1. 文本: "Model ID"
  2. JSX文本: "Model ID"
  3. 文本: "Note:"

### 71. `settings/providers/RequestyProvider.tsx`
- 所有界面文本:
  1. placeholder: "Custom base URL"
  2. JSX文本: "Use custom base URL"
  3. JSX文本: "Get Requesty API Key"

### 72. `settings/providers/QwenProvider.tsx`
- 所有界面文本:
  1. JSX文本: "Alibaba API Line"
  2. 文本: "Alibaba API Line"
  3. 段落文本: "Please select the appropriate API interface based on your location. If you are in China, choose the China API
				interface. Otherwise, choose the International API interface."

### 73. `mcp/chat-display/McpResponseDisplay.tsx`
- 所有界面文本:
  1. JSX文本: "Response (Error)"
  2. 文本: "Error parsing response:"
  3. JSX文本: "Error parsing response:"

### 75. `components/chat/VoiceRecorder.tsx`
- 所有界面文本:
  1. message: "No audio data received"
  2. JSX文本: "Cancel Recording"

### 76. `components/chat/QuotedMessagePreview.tsx`
- 所有界面文本:
  1. label: "Dismiss quote"
  2. aria-label: "Dismiss quote"

### 77. `settings/providers/AnthropicProvider.tsx`
- 所有界面文本:
  1. label: "Use custom base URL"
  2. placeholder: "Default: https://api.anthropic.com"

### 78. `settings/providers/AihubmixProvider.tsx`
- 所有界面文本:
  2. text: "Now request 10% discount!"

### 79. `settings/common/BaseUrlField.tsx`
- 所有界面文本:
  1. label: "Use custom base URL"
  2. placeholder: "Default: https://api.example.com"

### 80. `task-header/buttons/DeleteTaskButton.tsx`
- 所有界面文本:
  1. label: "Delete Task"
  2. aria-label: "Delete Task"

### 81. `mcp/chat-display/McpDisplayModeDropdown.tsx`
- 所有界面文本:
  1. JSX文本: "Rich Display"
  2. JSX文本: "Plain Text"

### 82. `tabs/installed/ServersToggleList.tsx`
- 所有界面文本:
  1. JSX文本: "No MCP servers installed"
  2. 文本: "No MCP servers installed"


### 89. `settings/providers/NebiusProvider.tsx`
- 所有界面文本:
  1. text: "This key is stored locally and only used to make API requests from this extension. (Note: Cline uses complex prompts and works best with Claude models. Less capable models may not work as expected.)"


### 91. `settings/common/ApiKeyField.tsx`
- 所有界面文本:
  1. placeholder: "Enter API Key..."

### 92. `settings/common/ModelSelector.tsx`
- 所有界面文本:
  1. JSX文本: "Select a model..."

### 93. `installed/server-row/McpToolRow.tsx`
- 所有界面文本:
  1. JSX文本: "Auto-approve"

### 1. `components/chat/ChatRow.tsx`
- 所有界面文本:
  1. JSX文本: "Cline wants to create a new file:"
  2. JSX文本: "Prompt:"
  4. JSX文本: "📋 Output is being logged to:"
  5. 文本: "Cline wants to use a subagent:"
  7. JSX文本: "Still having trouble?"
  8. 文本: "Summary:"
  9. 链接文本: "Still having trouble?"
  10. 文本: "Cline wants to create a new file:"
  11. JSX文本: "Auto-retry failed after"
  14. JSX文本: "View Changes"
  15. 文本: "Since you're experiencing repeated shell integration issues, we recommend switching to
									Background Terminal mode for better reliability."
  16. JSX文本: "Summary:"
  17. JSX文本: "Cline wants to use a subagent:"
  18. JSX文本: "Loading MCP documentation"
  19. JSX文本: "Cline wants to delete this file:"
  20. 文本: "Cline wants to delete this file:"
  21. 文本: "The model has determined this command requires explicit approval."
  22. 文本: "📋 Output is being logged to:"
  23. JSX文本: "The model has determined this command requires explicit approval."
  24. JSX文本: "Cline is condensing the conversation:"
  25. 文本: "Cline is condensing the conversation:"

### 2. `components/history/HistoryView.tsx`
- 所有界面文本:
  1. aria-label: "Delete all history"
  2. 文本: "`,
				inputText.substring(start, lastRegionNextIndex),
				""
  3. aria-label: "Clear search"
  4. label: "Delete all history"
  5. aria-label: "Delete selected items"
  6. label: "Delete selected items"
  7. label: "Clear search"

### 3. `components/chat/ChatTextArea.tsx`
- 所有界面文本:
  1. JSX文本: "Image dimensions exceed 7500px"
  2. JSX文本: "Files other than images are currently disabled"
  3. 文本: "Files other than images are currently disabled"
  5. 文本: "Image dimensions exceed 7500px"

### 4. `settings/providers/VSCodeLmProvider.tsx`
- 所有界面文本:
  1. 文本: "Language Model"
  2. JSX文本: "Select a model..."
  3. 段落文本: "The VS Code Language Model API allows you to run models provided by other VS Code extensions (including
						but not limited to GitHub Copilot). The easiest way to get started is to install the Copilot extension
						from the VS Marketplace and enabling Claude 4 Sonnet."
  4. JSX文本: "Note: This is a very experimental integration and may not work as expected."
  5. 段落文本: "Note: This is a very experimental integration and may not work as expected."
  6. JSX文本: "Language Model"

### 5. `chat/task-header/ContextWindow.tsx`
- 所有界面文本:
  1. aria-label: "Auto condense threshold"
  2. title: "Current tokens used in this request"
  3. label: "Context window usage progress"
  4. label: "Auto condense threshold"
  5. title: "Maximum context window size for this model"
  6. aria-label: "Context window usage progress"

### 6. `components/settings/ApiOptions.tsx`
- 所有界面文本:
  1. aria-label: "Clear search"
  3. label: "Clear search"

### 7. `components/common/MermaidBlock.tsx`
- 所有界面文本:
  1. JSX文本: "Generating mermaid diagram..."
  2. label: "Copy Code"
  3. aria-label: "Copy Code"
  4. title: "Copy Code"

### 8. `tabs/marketplace/McpMarketplaceCard.tsx`
- 所有界面文本:
  1. title: "Requires API key"
  2. JSX文本: "Community Made (use at your own risk)"
  3. 文本: "Community Made (use at your own risk)"

### 9. `components/chat/BrowserSessionRow.tsx`
- 所有界面文本:
  1. alt: "Browser screenshot"

### 10. `components/chat/ContextMenu.tsx`
- 所有界面文本:
  1. label: "Context mentions"
  2. aria-label: "Context mentions"

### 11. `components/common/MarkdownBlock.tsx`
- 所有界面文本:
  1. label: "Copy code"
  2. JSX文本: "Act Mode (⌘⇧A)"

### 13. `components/chat/CreditLimitError.tsx`
- 所有界面文本:
  1. message: "You have run out of credits."


