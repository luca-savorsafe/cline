import i18next from "i18next"
import * as vscode from "vscode"

// 定义语言代码映射
const languageMap: Record<string, string> = {
	en: "en",
	"en-us": "en",
	"zh-cn": "zh-CN",
	"zh-tw": "zh-TW",
	ja: "ja",
	ko: "ko",
	es: "es",
	de: "de",
	fr: "fr",
	"pt-br": "pt-BR",
	ru: "ru",
	ar: "ar",
	it: "it",
	nl: "nl",
	pl: "pl",
	tr: "tr",
	vi: "vi",
	hi: "hi",
	id: "id",
	ca: "ca",
}

// 格式化语言代码
export function formatLanguage(language: string): string {
	const normalized = language.toLowerCase().replace("_", "-")
	return languageMap[normalized] || "en"
}

// 获取当前语言
export function getCurrentLanguage(): string {
	return i18next.language
}

// 切换语言
export async function changeLanguage(language: string): Promise<void> {
	const formattedLanguage = formatLanguage(language)
	await i18next.changeLanguage(formattedLanguage)
}

// 翻译函数
export function t(key: string, options?: Record<string, any>): string {
	return i18next.t(key, options)
}

// 初始化 i18n
export async function initializeI18n(language?: string): Promise<void> {
	// 如果没有提供语言，使用 VS Code 环境语言
	const vscodeLanguage = vscode.env.language
	const defaultLanguage = language ? formatLanguage(language) : formatLanguage(vscodeLanguage)

	// 基础翻译资源
	const resources = {
		en: {
			translation: {
				// 通用翻译
				"common.welcome": "Welcome to Parrot",
				"common.loading": "Loading...",
				"common.error": "An error occurred",
				"common.success": "Success",
				"common.cancel": "Cancel",
				"common.confirm": "Confirm",
				"common.yes": "Yes",
				"common.no": "No",
				"common.ok": "OK",
				"common.close": "Close",
				"common.save": "Save",
				"common.delete": "Delete",
				"common.edit": "Edit",
				"common.add": "Add",
				"common.search": "Search",
				"common.refresh": "Refresh",
				"common.settings": "Settings",
				"common.help": "Help",
				"common.about": "About",

				// 错误消息
				"errors.command_timeout": "Command execution timed out after {{seconds}} seconds",
				"errors.file_not_found": "File not found: {{path}}",
				"errors.permission_denied": "Permission denied",
				"errors.network_error": "Network error",
				"errors.unknown_error": "Unknown error occurred",
				"errors.invalid_input": "Invalid input",
				"errors.operation_failed": "Operation failed",
				"errors.authentication_failed": "Authentication failed",
				"errors.resource_not_found": "Resource not found",
				"errors.validation_failed": "Validation failed",

				// UI 文本
				"ui.new_task": "New Task",
				"ui.chat": "Chat",
				"ui.history": "History",
				"ui.settings": "Settings",
				"ui.account": "Account",
				"ui.mcp_servers": "MCP Servers",
				"ui.send": "Send",
				"ui.attach_files": "Attach Files",
				"ui.clear_chat": "Clear Chat",
				"ui.export_chat": "Export Chat",
				"ui.import_chat": "Import Chat",
				"ui.theme": "Theme",
				"ui.language": "Language",
				"ui.notifications": "Notifications",
				"ui.shortcuts": "Shortcuts",
				"ui.feedback": "Feedback",
				"ui.documentation": "Documentation",
				"ui.support": "Support",
				"ui.version": "Version",
			},
		},
		"zh-CN": {
			translation: {
				// 通用翻译
				"common.welcome": "欢迎使用 Parrot",
				"common.loading": "加载中...",
				"common.error": "发生错误",
				"common.success": "成功",
				"common.cancel": "取消",
				"common.confirm": "确认",
				"common.yes": "是",
				"common.no": "否",
				"common.ok": "确定",
				"common.close": "关闭",
				"common.save": "保存",
				"common.delete": "删除",
				"common.edit": "编辑",
				"common.add": "添加",
				"common.search": "搜索",
				"common.refresh": "刷新",
				"common.settings": "设置",
				"common.help": "帮助",
				"common.about": "关于",

				// 错误消息
				"errors.command_timeout": "命令执行超时，已等待 {{seconds}} 秒",
				"errors.file_not_found": "文件未找到: {{path}}",
				"errors.permission_denied": "权限被拒绝",
				"errors.network_error": "网络错误",
				"errors.unknown_error": "发生未知错误",
				"errors.invalid_input": "输入无效",
				"errors.operation_failed": "操作失败",
				"errors.authentication_failed": "认证失败",
				"errors.resource_not_found": "资源未找到",
				"errors.validation_failed": "验证失败",

				// UI 文本
				"ui.new_task": "新建任务",
				"ui.chat": "聊天",
				"ui.history": "历史记录",
				"ui.settings": "设置",
				"ui.account": "账户",
				"ui.mcp_servers": "MCP 服务器",
				"ui.send": "发送",
				"ui.attach_files": "附加文件",
				"ui.clear_chat": "清空聊天",
				"ui.export_chat": "导出聊天",
				"ui.import_chat": "导入聊天",
				"ui.theme": "主题",
				"ui.language": "语言",
				"ui.notifications": "通知",
				"ui.shortcuts": "快捷键",
				"ui.feedback": "反馈",
				"ui.documentation": "文档",
				"ui.support": "支持",
				"ui.version": "版本",
			},
		},
	}

	// 初始化 i18next
	await i18next.init({
		lng: defaultLanguage,
		fallbackLng: "en",
		resources,
		interpolation: {
			escapeValue: false, // React 已经处理了转义
		},
	})

	console.log(`i18n initialized with language: ${defaultLanguage}`)
}
