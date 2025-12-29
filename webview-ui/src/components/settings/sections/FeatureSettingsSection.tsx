import { McpDisplayMode } from "@shared/McpDisplayMode"
import { EmptyRequest } from "@shared/proto/index.cline"
import { OpenaiReasoningEffort } from "@shared/storage/types"
import { VSCodeButton, VSCodeCheckbox, VSCodeDropdown, VSCodeOption, VSCodeTextField } from "@vscode/webview-ui-toolkit/react"
import { memo, useEffect, useState } from "react"
import McpDisplayModeDropdown from "@/components/mcp/chat-display/McpDisplayModeDropdown"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { PLATFORM_CONFIG, PlatformType } from "@/config/platform.config"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { StateServiceClient } from "@/services/grpc-client"
import { isMacOSOrLinux } from "@/utils/platformUtils"
import Section from "../Section"
import SubagentOutputLineLimitSlider from "../SubagentOutputLineLimitSlider"
import { updateSetting } from "../utils/settingsHandlers"

interface FeatureSettingsSectionProps {
	renderSectionHeader: (tabId: string) => JSX.Element | null
}

const FeatureSettingsSection = ({ renderSectionHeader }: FeatureSettingsSectionProps) => {
	const {
		enableCheckpointsSetting,
		mcpDisplayMode,
		mcpResponsesCollapsed,
		openaiReasoningEffort,
		strictPlanModeEnabled,
		yoloModeToggled,
		dictationSettings,
		useAutoCondense,
		clineWebToolsEnabled,
		focusChainSettings,
		multiRootSetting,
		hooksEnabled,
		remoteConfigSettings,
		subagentsEnabled,
		nativeToolCallSetting,
		enableParallelToolCalling,
		backgroundEditEnabled,
	} = useExtensionState()

	const [isClineCliInstalled, setIsClineCliInstalled] = useState(false)

	const handleReasoningEffortChange = (newValue: OpenaiReasoningEffort) => {
		updateSetting("openaiReasoningEffort", newValue)
	}

	// Poll for CLI installation status while the component is mounted
	useEffect(() => {
		const checkInstallation = async () => {
			try {
				const result = await StateServiceClient.checkCliInstallation(EmptyRequest.create())
				setIsClineCliInstalled(result.value)
			} catch (error) {
				console.error("Failed to check CLI installation:", error)
			}
		}

		checkInstallation()

		// Poll ever 1.5 seconds to see if CLI is installed (only when form is open)
		const pollInterval = setInterval(checkInstallation, 1500)

		return () => {
			clearInterval(pollInterval)
		}
	}, [])

	return (
		<div>
			{renderSectionHeader("features")}
			<Section>
				<div style={{ marginBottom: 20 }}>
					{/* Subagents - Only show on macOS and Linux */}
					{isMacOSOrLinux() && PLATFORM_CONFIG.type === PlatformType.VSCODE && (
						<div
							className="relative p-3 mb-3 rounded-md"
							id="subagents-section"
							style={{
								border: "1px solid var(--vscode-widget-border)",
								backgroundColor: "var(--vscode-list-hoverBackground)",
							}}>
							<div
								className="absolute -top-2 -right-2 px-2 py-0.5 rounded text-xs font-semibold"
								style={{
									backgroundColor: "var(--vscode-button-secondaryBackground)",
									color: "var(--vscode-button-secondaryForeground)",
								}}>
								NEW
							</div>

							<div
								className="mt-1.5 mb-2 px-2 pt-0.5 pb-1.5 rounded"
								style={{
									backgroundColor: "color-mix(in srgb, var(--vscode-sideBar-background) 99%, black)",
								}}>
								<p
									className="text-xs mb-2 flex items-start"
									style={{ color: "var(--vscode-inputValidation-warningForeground)" }}>
									<span
										className="codicon codicon-warning mr-1"
										style={{ fontSize: "12px", marginTop: "1px", flexShrink: 0 }}></span>
									<span>
										子代理需要 Cline CLI。使用以下命令安装：
										<code
											className="ml-1 px-1 rounded"
											style={{
												backgroundColor: "var(--vscode-editor-background)",
												color: "var(--vscode-foreground)",
												opacity: 0.9,
											}}>
											npm install -g cline
										</code>
										，然后运行
										<code
											className="ml-1 px-1 rounded"
											style={{
												backgroundColor: "var(--vscode-editor-background)",
												color: "var(--vscode-foreground)",
												opacity: 0.9,
											}}>
											cline auth
										</code>
										以使用 Cline 进行身份验证或配置 API 提供商。
									</span>
								</p>
								{!isClineCliInstalled && (
									<VSCodeButton
										appearance="secondary"
										onClick={async () => {
											try {
												await StateServiceClient.installClineCli(EmptyRequest.create())
											} catch (error) {
												console.error("Failed to initiate CLI installation:", error)
											}
										}}
										style={{
											transform: "scale(0.85)",
											transformOrigin: "left center",
											marginLeft: "-2px",
										}}>
										立即安装
									</VSCodeButton>
								)}
							</div>
							<VSCodeCheckbox
								checked={subagentsEnabled}
								disabled={!isClineCliInstalled}
								onChange={(e: any) => {
									const checked = e.target.checked === true
									updateSetting("subagentsEnabled", checked)
								}}>
								<span className="font-semibold">{subagentsEnabled ? "子代理已启用" : "启用子代理"}</span>
							</VSCodeCheckbox>
							<p className="text-xs mt-1 mb-0">
								<span className="text-[var(--vscode-errorForeground)]">实验性：</span>{" "}
								<span className="text-description">
									允许 Cline 生成子进程来处理专注任务，如探索大型代码库，保持您的主上下文清洁。
								</span>
							</p>
							{subagentsEnabled && (
								<div className="mt-3">
									<SubagentOutputLineLimitSlider />
								</div>
							)}
						</div>
					)}

					<div>
						<VSCodeCheckbox
							checked={enableCheckpointsSetting}
							onChange={(e: any) => {
								const checked = e.target.checked === true
								updateSetting("enableCheckpointsSetting", checked)
							}}>
							启用检查点
						</VSCodeCheckbox>
						<p className="text-xs text-(--vscode-descriptionForeground)">
							允许扩展在任务期间保存工作空间的检查点。底层使用 git，可能不适用于大型工作空间。
						</p>
					</div>
					<div style={{ marginTop: 10 }}>
						<label
							className="block text-sm font-medium text-(--vscode-foreground) mb-1"
							htmlFor="mcp-display-mode-dropdown">
							MCP 显示模式
						</label>
						<McpDisplayModeDropdown
							className="w-full"
							id="mcp-display-mode-dropdown"
							onChange={(newMode: McpDisplayMode) => updateSetting("mcpDisplayMode", newMode)}
							value={mcpDisplayMode}
						/>
						<p className="text-xs mt-[5px] text-(--vscode-descriptionForeground)">
							控制 MCP 响应的显示方式：纯文本、带链接/图像的富格式或 Markdown 渲染。
						</p>
					</div>
					<div style={{ marginTop: 10 }}>
						<VSCodeCheckbox
							checked={mcpResponsesCollapsed}
							onChange={(e: any) => {
								const checked = e.target.checked === true
								updateSetting("mcpResponsesCollapsed", checked)
							}}>
							折叠 MCP 响应
						</VSCodeCheckbox>
						<p className="text-xs text-(--vscode-descriptionForeground)">设置 MCP 响应面板的默认显示模式</p>
					</div>
					<div style={{ marginTop: 10 }}>
						<label
							className="block text-sm font-medium text-(--vscode-foreground) mb-1"
							htmlFor="openai-reasoning-effort-dropdown">
							OpenAI 推理力度
						</label>
						<VSCodeDropdown
							className="w-full"
							currentValue={openaiReasoningEffort || "medium"}
							id="openai-reasoning-effort-dropdown"
							onChange={(e: any) => {
								const newValue = e.target.currentValue as OpenaiReasoningEffort
								handleReasoningEffortChange(newValue)
							}}>
							<VSCodeOption value="minimal">Minimal</VSCodeOption>
							<VSCodeOption value="low">Low</VSCodeOption>
							<VSCodeOption value="medium">Medium</VSCodeOption>
							<VSCodeOption value="high">High</VSCodeOption>
						</VSCodeDropdown>
						<p className="text-xs mt-[5px] text-(--vscode-descriptionForeground)">
							OpenAI 系列模型的推理力度（适用于所有 OpenAI 模型提供商）
						</p>
					</div>
					<div style={{ marginTop: 10 }}>
						<VSCodeCheckbox
							checked={strictPlanModeEnabled}
							onChange={(e: any) => {
								const checked = e.target.checked === true
								updateSetting("strictPlanModeEnabled", checked)
							}}>
							启用严格计划模式
						</VSCodeCheckbox>
						<p className="text-xs text-(--vscode-descriptionForeground)">
							在计划模式下强制执行严格的工具使用，防止文件编辑。
						</p>
					</div>
					{
						<div style={{ marginTop: 10 }}>
							<VSCodeCheckbox
								checked={focusChainSettings?.enabled || false}
								onChange={(e: any) => {
									const checked = e.target.checked === true
									updateSetting("focusChainSettings", { ...focusChainSettings, enabled: checked })
								}}>
								启用焦点链
							</VSCodeCheckbox>
							<p className="text-xs text-(--vscode-descriptionForeground)">
								启用增强的任务进度跟踪和整个任务期间的自动焦点链列表管理。
							</p>
						</div>
					}
					{focusChainSettings?.enabled && (
						<div style={{ marginTop: 10, marginLeft: 20 }}>
							<label
								className="block text-sm font-medium text-(--vscode-foreground) mb-1"
								htmlFor="focus-chain-remind-interval">
								焦点链提醒间隔
							</label>
							<VSCodeTextField
								className="w-20"
								id="focus-chain-remind-interval"
								onChange={(e: any) => {
									const value = parseInt(e.target.value, 10)
									if (!Number.isNaN(value) && value >= 1 && value <= 100) {
										updateSetting("focusChainSettings", {
											...focusChainSettings,
											remindClineInterval: value,
										})
									}
								}}
								value={String(focusChainSettings?.remindClineInterval || 6)}
							/>
							<p className="text-xs mt-[5px] text-(--vscode-descriptionForeground)">
								提醒 Cline 其焦点链检查表的间隔（以消息数计，1-100）。较低的值提供更频繁的提醒。
							</p>
						</div>
					)}
					{dictationSettings?.featureEnabled && (
						<div className="mt-2.5">
							<VSCodeCheckbox
								checked={dictationSettings?.dictationEnabled}
								onChange={(e: any) => {
									const checked = e.target.checked === true
									const updatedDictationSettings = {
										...dictationSettings,
										dictationEnabled: checked,
									}
									updateSetting("dictationSettings", updatedDictationSettings)
								}}>
								启用听写
							</VSCodeCheckbox>
							<p className="text-xs text-description mt-1">
								使用您的 Cline 账户启用语音到文本转录。使用 Aqua Voice 的 Avalon 模型，每分钟处理的音频费用为
								$0.0065 积分。每条消息最多 5 分钟。
							</p>
						</div>
					)}
					<div style={{ marginTop: 10 }}>
						<VSCodeCheckbox
							checked={useAutoCondense}
							onChange={(e: any) => {
								const checked = e.target.checked === true
								updateSetting("useAutoCondense", checked)
							}}>
							启用自动压缩
						</VSCodeCheckbox>
						<p className="text-xs text-(--vscode-descriptionForeground)">
							启用高级上下文管理系统，该系统使用基于 LLM 的压缩技术用于下一代模型。{" "}
							<a
								className="text-(--vscode-textLink-foreground) hover:text-(--vscode-textLink-activeForeground)"
								href="https://docs.cline.bot/features/auto-compact"
								rel="noopener noreferrer"
								target="_blank">
								了解更多
							</a>
						</p>
					</div>
					{clineWebToolsEnabled?.featureFlag && (
						<div style={{ marginTop: 10 }}>
							<VSCodeCheckbox
								checked={clineWebToolsEnabled?.user}
								onChange={(e: any) => {
									const checked = e.target.checked === true
									updateSetting("clineWebToolsEnabled", checked)
								}}>
								启用 Cline 网络工具
							</VSCodeCheckbox>
							<p className="text-xs text-(--vscode-descriptionForeground)">
								在使用 Cline 提供商时启用网络搜索和网络获取工具。
							</p>
						</div>
					)}
					<div className="mt-2.5">
						<VSCodeCheckbox
							checked={nativeToolCallSetting}
							onChange={(e) => {
								const enabled = (e?.target as HTMLInputElement).checked
								updateSetting("nativeToolCallEnabled", enabled)
							}}>
							Enable Native Tool Call
						</VSCodeCheckbox>
						<p className="text-xs text-(--vscode-descriptionForeground)">
							Uses the model's native tool calling API instead of XML-based tool parsing. This will improve
							performance for supported models.
						</p>
					</div>
					<div className="mt-2.5">
						<VSCodeCheckbox
							checked={enableParallelToolCalling}
							onChange={(e) => {
								const enabled = (e?.target as HTMLInputElement).checked
								updateSetting("enableParallelToolCalling", enabled)
							}}>
							Enable Parallel Tool Calling
						</VSCodeCheckbox>
						<p className="text-xs">
							<span className="text-(--vscode-errorForeground)">Experimental: </span>{" "}
							<span className="text-description">
								Allows models to call multiple tools in a single response. Automatically enabled for GPT-5 models.
							</span>
						</p>
					</div>
					<div className="mt-2.5">
						<VSCodeCheckbox
							checked={backgroundEditEnabled}
							onChange={(e: any) => {
								const checked = e.target.checked === true
								updateSetting("backgroundEditEnabled", checked)
							}}>
							Enable Background Edit
						</VSCodeCheckbox>
						<p className="text-xs">
							<span className="text-error">Experimental: </span>
							<span className="text-description">
								Allows editing files in background without opening the diff view in editor.
							</span>
						</p>
					</div>
					{multiRootSetting.featureFlag && (
						<div className="mt-2.5">
							<VSCodeCheckbox
								checked={multiRootSetting.user}
								onChange={(e: any) => {
									const checked = e.target.checked === true
									updateSetting("multiRootEnabled", checked)
								}}>
								Enable Multi-Root Workspace
							</VSCodeCheckbox>
							<p className="text-xs">
								<span className="text-error">Experimental: </span>{" "}
								<span className="text-description">Allows cline to work across multiple workspaces.</span>
							</p>
						</div>
					)}
					<div className="mt-2.5">
						<VSCodeCheckbox
							checked={hooksEnabled}
							disabled={!isMacOSOrLinux()}
							onChange={(e: any) => {
								const checked = e.target.checked === true
								updateSetting("hooksEnabled", checked)
							}}>
							Enable Hooks
						</VSCodeCheckbox>
						{!isMacOSOrLinux() ? (
							<p className="text-xs mt-1" style={{ color: "var(--vscode-inputValidation-warningForeground)" }}>
								Hooks are not yet supported on Windows. This feature is currently available on macOS and Linux
								only.
							</p>
						) : (
							<p className="text-xs">
								<span className="text-(--vscode-errorForeground)">Experimental: </span>{" "}
								<span className="text-description">
									Allows execution of hooks from .clinerules/hooks/ directory.
								</span>
							</p>
						)}
					</div>
					<div style={{ marginTop: 10 }}>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className="flex items-center gap-2">
									<VSCodeCheckbox
										checked={yoloModeToggled}
										disabled={remoteConfigSettings?.yoloModeToggled !== undefined}
										onChange={(e: any) => {
											const checked = e.target.checked === true
											updateSetting("yoloModeToggled", checked)
										}}>
										Enable YOLO Mode
									</VSCodeCheckbox>
									{remoteConfigSettings?.yoloModeToggled !== undefined && (
										<i className="codicon codicon-lock text-description text-sm" />
									)}
								</div>
							</TooltipTrigger>
							<TooltipContent
								className="max-w-xs"
								hidden={remoteConfigSettings?.yoloModeToggled === undefined}
								side="top">
								This setting is managed by your organization's remote configuration
							</TooltipContent>
						</Tooltip>

						<p className="text-xs text-(--vscode-errorForeground)">
							EXPERIMENTAL & DANGEROUS: This mode disables safety checks and user confirmations. Cline will
							automatically approve all actions without asking. Use with extreme caution.
						</p>
					</div>
				</div>
			</Section>
		</div>
	)
}

export default memo(FeatureSettingsSection)
