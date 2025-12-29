import { VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { XIcon } from "lucide-react"
import { CSSProperties, memo, useState } from "react"
import { useMount } from "react-use"
import { Button } from "@/components/ui/button"
import { PLATFORM_CONFIG, PlatformType } from "@/config/platform.config"
import { useClineAuth, useClineSignIn } from "@/context/ClineAuthContext"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { getAsVar, VSC_DESCRIPTION_FOREGROUND, VSC_INACTIVE_SELECTION_BACKGROUND } from "@/utils/vscStyles"
import { useApiConfigurationHandlers } from "../settings/utils/useApiConfigurationHandlers"

interface AnnouncementProps {
	version: string
	hideAnnouncement: () => void
}

const containerStyle: CSSProperties = {
	backgroundColor: getAsVar(VSC_INACTIVE_SELECTION_BACKGROUND),
	borderRadius: "3px",
	padding: "12px 16px",
	margin: "5px 15px 5px 15px",
	position: "relative",
	flexShrink: 0,
}
const h2TitleStyle: CSSProperties = { margin: "0 0 8px", fontWeight: "bold" }
const ulStyle: CSSProperties = { margin: "0 0 8px", paddingLeft: "12px", listStyleType: "disc" }
const _accountIconStyle: CSSProperties = { fontSize: 11 }
const hrStyle: CSSProperties = {
	height: "1px",
	background: getAsVar(VSC_DESCRIPTION_FOREGROUND),
	opacity: 0.1,
	margin: "8px 0",
}
const linkContainerStyle: CSSProperties = { margin: "0" }
const linkStyle: CSSProperties = { display: "inline" }

/*
Announcements are automatically shown when the major.minor version changes (for ex 3.19.x → 3.20.x or 4.0.x). 
The latestAnnouncementId is now automatically generated from the extension's package.json version. 
Patch releases (3.19.1 → 3.19.2) will not trigger new announcements.
*/
const Announcement = ({ version, hideAnnouncement }: AnnouncementProps) => {
	const { clineUser } = useClineAuth()
	const { openRouterModels, setShowChatModelSelector, refreshOpenRouterModels } = useExtensionState()
	const user = clineUser || undefined
	const { handleFieldsChange } = useApiConfigurationHandlers()
	const { isLoginLoading, handleSignIn } = useClineSignIn()

	const [didClickDevstralButton, setDidClickDevstralButton] = useState(false)
	// Need to get latest model list in case user hits shortcut button to set model
	useMount(refreshOpenRouterModels)

	const setDevstral = () => {
		const modelId = "mistralai/devstral-2512"
		// set both plan and act modes to use code-supernova-1-million
		handleFieldsChange({
			planModeOpenRouterModelId: modelId,
			actModeOpenRouterModelId: modelId,
			planModeOpenRouterModelInfo: openRouterModels[modelId],
			actModeOpenRouterModelInfo: openRouterModels[modelId],
			planModeApiProvider: "cline",
			actModeApiProvider: "cline",
		})

		setTimeout(() => {
			setDidClickDevstralButton(true)
			setShowChatModelSelector(true)
		}, 10)
	}

	const isVscode = PLATFORM_CONFIG.type === PlatformType.VSCODE

	return (
		<div style={containerStyle}>
			<Button
				className="absolute top-2.5 right-2"
				data-testid="close-announcement-button"
				onClick={hideAnnouncement}
				size="icon"
				variant="icon">
				<XIcon />
			</Button>
			<h2 style={h2TitleStyle}>
				🎉{"  "}v{version} 版本新功能
			</h2>
			<ul style={ulStyle}>
				{isVscode && (
					<>
						<li>
							新增{" "}
							<VSCodeLink href="https://docs.cline.bot/features/explain-changes" style={linkStyle}>
								解释更改
							</VSCodeLink>{" "}
							按钮，当 Cline 完成任务时，可帮助通过内联聊天审查代码。您可以回复评论，或将聊天内容作为上下文发送回
							Cline。
						</li>
						<li>
							使用新的{" "}
							<VSCodeLink href="https://docs.cline.bot/features/slash-commands/explain-changes" style={linkStyle}>
								/explain-changes
							</VSCodeLink>{" "}
							斜杠命令来解释分支、提交等中的更改。（尝试让 Cline 解释您需要审查的 PR！）
						</li>
					</>
				)}
			</ul>
			{isVscode && (
				<p style={{ margin: "0" }}>
					查看{" "}
					<VSCodeLink href="https://x.com/sdrzn/status/1995840893816111246" style={linkStyle}>
						"解释更改"演示
					</VSCodeLink>
				</p>
			)}
			<div style={hrStyle} />
			<p style={linkContainerStyle}>
				加入我们的{" "}
				<VSCodeLink href="https://x.com/cline" style={linkStyle}>
					X、
				</VSCodeLink>{" "}
				<VSCodeLink href="https://discord.gg/cline" style={linkStyle}>
					Discord、
				</VSCodeLink>{" "}
				或{" "}
				<VSCodeLink href="https://www.reddit.com/r/cline/" style={linkStyle}>
					r/cline
				</VSCodeLink>
				获取更多更新！
			</p>
		</div>
	)
}

export default memo(Announcement)
