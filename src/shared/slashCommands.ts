export interface SlashCommand {
	name: string
	description?: string
	section?: "default" | "custom"
	cliCompatible?: boolean
}

export const BASE_SLASH_COMMANDS: SlashCommand[] = [
	{
		name: "newtask",
		description: "基于当前任务上下文创建新任务",
		section: "default",
		cliCompatible: true,
	},
	{
		name: "smol",
		description: "压缩当前上下文窗口",
		section: "default",
		cliCompatible: true,
	},
	{
		name: "newrule",
		description: "基于对话创建新的Cline规则",
		section: "default",
		cliCompatible: true,
	},
	{
		name: "reportbug",
		description: "使用Cline创建Github问题",
		section: "default",
		cliCompatible: true,
	},
	{
		name: "deep-planning",
		description: "在编码前创建全面的实施计划",
		section: "default",
		cliCompatible: true,
	},
	{
		name: "subagent",
		description: "调用Cline CLI子代理进行专注的研究任务",
		section: "default",
		cliCompatible: true,
	},
]

// VS Code-only slash commands
export const VSCODE_ONLY_COMMANDS: SlashCommand[] = [
	{
		name: "explain-changes",
		description: "解释git引用之间的代码变更（PR、提交、分支等）",
		section: "default",
	},
]
