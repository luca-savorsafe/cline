import { EmptyRequest, Int64Request } from "@shared/proto/index.cline"
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import { Terminal, XIcon } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { StateServiceClient } from "@/services/grpc-client"
import { isMacOSOrLinux } from "@/utils/platformUtils"
import { getAsVar, VSC_INACTIVE_SELECTION_BACKGROUND } from "@/utils/vscStyles"

export const CURRENT_CLI_BANNER_VERSION = 1

export const CliInstallBanner: React.FC = () => {
	const { navigateToSettings, subagentsEnabled } = useExtensionState()
	const [isCopied, setIsCopied] = useState(false)
	const [isClineCliInstalled, setIsClineCliInstalled] = useState(false)

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

		// Check immediately when component mounts
		checkInstallation()

		// Set up polling interval (every 1.5 seconds)
		const pollInterval = setInterval(checkInstallation, 1500)

		// Clean up interval when component unmounts
		return () => {
			clearInterval(pollInterval)
		}
	}, [])

	const handleClose = useCallback((e?: React.MouseEvent) => {
		e?.preventDefault()
		e?.stopPropagation()

		// Update state to hide banner
		StateServiceClient.updateCliBannerVersion(Int64Request.create({ value: CURRENT_CLI_BANNER_VERSION })).catch(console.error)
	}, [])

	const handleInstallClick = async () => {
		if (!isClineCliInstalled) {
			try {
				// Call the backend to initiate CLI installation
				await StateServiceClient.installClineCli(EmptyRequest.create())
				// Banner will automatically close after successful installation
				// setTimeout(() => {
				// 	handleClose()
				// }, 500)
			} catch (error) {
				console.error("Failed to initiate CLI installation:", error)
			}
		}
	}

	const handleEnableSubagents = () => {
		if (!subagentsEnabled) {
			navigateToSettings("features")
		}
	}

	const handleCopyCommand = async (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		// Copy the install command to clipboard
		await navigator.clipboard.writeText("npm install -g cline")

		// Show feedback by changing the icon
		setIsCopied(true)
		setTimeout(() => {
			setIsCopied(false)
		}, 1500)
	}

	return (
		<div
			className="flex flex-col gap-1 shrink-0 mb-1 relative text-sm mt-1.5 mx-4 no-underline transition-colors border-0 text-left"
			style={{
				backgroundColor: getAsVar(VSC_INACTIVE_SELECTION_BACKGROUND),
				borderRadius: "3px",
				color: "var(--vscode-foreground)",
				padding: "12px",
			}}>
			<h4 className="m-0 flex items-center gap-2" style={{ paddingRight: "24px" }}>
				<Terminal className="w-4 h-4" />
				{isMacOSOrLinux() ? "Cline CLI 现已推出！" : "Cline CLI 信息"}
			</h4>
			<p className="m-0">
				{isMacOSOrLinux() ? (
					<>
						安装后可直接在终端中使用 Cline 并启用子代理功能。Cline 可以生成 <code>cline</code>{" "}
						命令来处理特定任务，例如探索大型代码库以获取信息。
						通过在单独的子进程中运行这些操作，可以保持主上下文窗口的整洁。{" "}
						<a
							href="https://docs.cline.bot/cline-cli/overview"
							rel="noopener noreferrer"
							style={{ color: "var(--vscode-textLink-foreground)" }}
							target="_blank">
							了解更多
						</a>
					</>
				) : (
					<>
						Cline CLI 适用于 macOS 和 Linux！其他平台<code>即将</code>推出。{" "}
						<a
							href="https://docs.cline.bot/cline-cli/overview"
							rel="noopener noreferrer"
							style={{ color: "var(--vscode-textLink-foreground)" }}
							target="_blank">
							了解更多
						</a>
					</>
				)}
			</p>
			<div className="flex flex-col gap-2 my-1">
				<div
					className="p-2 rounded flex items-center justify-between"
					style={{
						backgroundColor: "var(--vscode-editor-background)",
						fontFamily: "var(--vscode-editor-font-family)",
						fontSize: 12,
					}}>
					npm install -g cline
					<VSCodeButton
						appearance="icon"
						onClick={handleCopyCommand}
						style={{ marginLeft: "8px", flexShrink: 0 }}
						title={isCopied ? "已复制！" : "复制命令"}>
						<span className={`codicon ${isCopied ? "codicon-check" : "codicon-copy"}`}></span>
					</VSCodeButton>
				</div>
				{isMacOSOrLinux() ? (
					<div className="flex gap-2">
						<VSCodeButton
							appearance="primary"
							className="flex-1"
							disabled={isClineCliInstalled}
							onClick={handleInstallClick}>
							{isClineCliInstalled ? (
								<>
									<span className="codicon codicon-check" style={{ marginRight: "4px" }}></span>
									已安装
								</>
							) : (
								"安装"
							)}
						</VSCodeButton>
						<VSCodeButton
							appearance="primary"
							className="flex-1"
							disabled={subagentsEnabled}
							onClick={handleEnableSubagents}
							title="配置子代理">
							启用子代理
						</VSCodeButton>
					</div>
				) : (
					<div className="flex gap-2">
						<VSCodeButton
							appearance="primary"
							className="flex-1"
							disabled={isClineCliInstalled}
							onClick={handleInstallClick}>
							{isClineCliInstalled ? (
								<>
									<span className="codicon codicon-check" style={{ marginRight: "4px" }}></span>
									已安装
								</>
							) : (
								"安装 CLI"
							)}
						</VSCodeButton>
						<VSCodeButton
							appearance="secondary"
							className="flex-1"
							disabled
							title="Cline CLI 和子代理仅适用于 macOS 和 Linux">
							子代理（Windows 即将推出）
						</VSCodeButton>
					</div>
				)}
			</div>

			{/* Close button */}
			<Button
				className="absolute top-2.5 right-2"
				data-testid="cli-banner-close-button"
				onClick={handleClose}
				size="icon"
				variant="icon">
				<XIcon />
			</Button>
		</div>
	)
}

export default CliInstallBanner
