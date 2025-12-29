export enum NEW_USER_TYPE {
	FREE = "free",
	POWER = "power",
	BYOK = "byok",
}

type UserTypeSelection = {
	title: string
	description: string
	type: NEW_USER_TYPE
}

export const STEP_CONFIG = {
	0: {
		title: "您将如何使用 Cline？",
		description: "请选择以下选项开始使用。",
		buttons: [
			{ text: "继续", action: "next", variant: "default" },
			{ text: "登录 Cline", action: "signin", variant: "secondary" },
		],
	},
	[NEW_USER_TYPE.FREE]: {
		title: "选择免费模型",
		buttons: [
			{ text: "创建我的账户", action: "signup", variant: "default" },
			{ text: "返回", action: "back", variant: "secondary" },
		],
	},
	[NEW_USER_TYPE.POWER]: {
		title: "选择您的模型",
		buttons: [
			{ text: "创建我的账户", action: "signup", variant: "default" },
			{ text: "返回", action: "back", variant: "secondary" },
		],
	},
	[NEW_USER_TYPE.BYOK]: {
		title: "配置您的提供商",
		buttons: [
			{ text: "继续", action: "done", variant: "default" },
			{ text: "返回", action: "back", variant: "secondary" },
		],
	},
	2: {
		title: "即将完成！",
		description: "请在浏览器中完成账户创建。完成后返回此处完成设置。",
		buttons: [{ text: "返回", action: "back", variant: "secondary" }],
	},
} as const

export const USER_TYPE_SELECTIONS: UserTypeSelection[] = [
	{ title: "完全免费", description: "无需任何费用即可开始使用", type: NEW_USER_TYPE.FREE },
	{ title: "前沿模型", description: "Claude 4.5、GPT-5 Codex 等", type: NEW_USER_TYPE.POWER },
	{ title: "使用自己的 API 密钥", description: "使用您选择的提供商与 Cline", type: NEW_USER_TYPE.BYOK },
]
