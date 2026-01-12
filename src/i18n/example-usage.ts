// 示例：如何使用 i18n 系统迁移硬编码文本
// 注意：在实际项目中，应使用 HostProvider.window.showMessage 而不是直接使用 vscode API

import { t } from "./index"

// 示例 1: 错误消息
export function showErrorExample() {
	// 迁移前
	// HostProvider.window.showMessage({ type: ShowMessageType.ERROR, message: "Failed to get terminal contents" });
	// 迁移后
	// HostProvider.window.showMessage({
	//   type: ShowMessageType.ERROR,
	//   message: t('errors.operation_failed', { operation: 'get terminal contents' })
	// });
}

// 示例 2: 信息消息
export function showInfoExample() {
	// 迁移前
	// HostProvider.window.showMessage({ type: ShowMessageType.INFO, message: "Cline extension activated" });
	// 迁移后
	// HostProvider.window.showMessage({
	//   type: ShowMessageType.INFO,
	//   message: t('common.success', { context: 'Cline extension activated' })
	// });
}

// 示例 3: 带变量的消息
export function showCommandTimeout(seconds: number) {
	// 迁移前
	// HostProvider.window.showMessage({
	//   type: ShowMessageType.ERROR,
	//   message: `Command execution timed out after ${seconds} seconds`
	// });
	// 迁移后
	// HostProvider.window.showMessage({
	//   type: ShowMessageType.ERROR,
	//   message: t('errors.command_timeout', { seconds })
	// });
}

// 示例 4: UI 文本
export function getUIText() {
	return {
		// 迁移前
		newTask: "New Task",
		settings: "Settings",
		history: "History",

		// 迁移后
		newTaskTranslated: t("ui.new_task"),
		settingsTranslated: t("ui.settings"),
		historyTranslated: t("ui.history"),
	}
}

// 示例 5: 确认对话框
// 注意：实际项目中应使用 HostProvider.window.showConfirmationDialog
export async function showConfirmationDialog() {
	// 迁移前
	// const answer = await HostProvider.window.showConfirmationDialog({
	//   message: "Are you sure you want to delete this task?",
	//   modal: true,
	//   options: ["Yes", "No"]
	// });
	// 迁移后
	// const answerTranslated = await HostProvider.window.showConfirmationDialog({
	//   message: t('common.confirmation.delete_task'),
	//   modal: true,
	//   options: [t('common.yes'), t('common.no')]
	// });
	// return answerTranslated;
}

// 最佳实践建议：
// 1. 为每个功能模块创建单独的翻译命名空间
// 2. 使用有意义的键名，如 'errors.command_timeout' 而不是 'error1'
// 3. 对于带变量的文本，使用 {{variable}} 语法
// 4. 保持翻译键的层次结构清晰
// 5. 在代码审查时检查所有硬编码文本是否已迁移
// 6. 使用项目提供的 HostProvider 而不是直接使用 vscode API
