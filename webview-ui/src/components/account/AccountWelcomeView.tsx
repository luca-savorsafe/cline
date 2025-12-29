import { VSCodeButton, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { useClineSignIn } from "@/context/ClineAuthContext"
import { useExtensionState } from "@/context/ExtensionStateContext"
import ClineLogoVariable from "../../assets/ClineLogoVariable"

// export const AccountWelcomeView = () => (
// 	<div className="flex flex-col items-center pr-3 gap-2.5">
// 		<ClineLogoWhite className="size-16 mb-4" />
export const AccountWelcomeView = () => {
	const { environment } = useExtensionState()
	const { isLoginLoading, handleSignIn } = useClineSignIn()

	return (
		<div className="flex flex-col items-center pr-3 gap-2.5">
			<ClineLogoVariable className="size-16 mb-4" environment={environment} />

			<p>注册账户以获取最新模型的访问权限、查看使用情况和额度的计费仪表板，以及更多即将推出的功能。</p>

			<VSCodeButton className="w-full mb-4" disabled={isLoginLoading} onClick={handleSignIn}>
				使用 Cline 注册
				{isLoginLoading && (
					<span className="ml-1 animate-spin">
						<span className="codicon codicon-refresh"></span>
					</span>
				)}
			</VSCodeButton>

			<p className="text-(--vscode-descriptionForeground) text-xs text-center m-0">
				继续即表示您同意<VSCodeLink href="https://cline.bot/tos">服务条款</VSCodeLink>和{" "}
				<VSCodeLink href="https://cline.bot/privacy">隐私政策。</VSCodeLink>
			</p>
		</div>
	)
}
