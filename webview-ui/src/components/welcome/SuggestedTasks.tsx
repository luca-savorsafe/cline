import { NewTaskRequest } from "@shared/proto/cline/task"
import React from "react"
import { useTranslation } from "react-i18next"
import { TaskServiceClient } from "@/services/grpc-client"
import QuickWinCard from "./QuickWinCard"
import { QuickWinTask, quickWinTasks } from "./quickWinTasks"

export const SuggestedTasks: React.FC<{ shouldShowQuickWins: boolean }> = ({ shouldShowQuickWins }) => {
	const { t } = useTranslation()
	const handleExecuteQuickWin = async (prompt: string) => {
		await TaskServiceClient.newTask(NewTaskRequest.create({ text: prompt, images: [] }))
	}

	// Create localized tasks with translated titles and descriptions
	const localizedQuickWinTasks: QuickWinTask[] = [
		{
			...quickWinTasks[0],
			title: t("welcome.suggestedTasks.nextjsNotetakingApp.title"),
			description: t("welcome.suggestedTasks.nextjsNotetakingApp.description"),
		},
		{
			...quickWinTasks[1],
			title: t("welcome.suggestedTasks.terminalCliTool.title"),
			description: t("welcome.suggestedTasks.terminalCliTool.description"),
		},
		{
			...quickWinTasks[2],
			title: t("welcome.suggestedTasks.snakeGame.title"),
			description: t("welcome.suggestedTasks.snakeGame.description"),
		},
	]

	if (shouldShowQuickWins) {
		return (
			<div className="px-4 pt-1 pb-3 select-none">
				{" "}
				<h2 className="text-sm font-medium mb-2.5 text-center text-gray">
					{t("welcome.suggestedTasks.title")}
				</h2>
				<div className="flex flex-col space-y-1">
					{" "}
					{localizedQuickWinTasks.map((task: QuickWinTask) => (
						<QuickWinCard key={task.id} onExecute={() => handleExecuteQuickWin(task.prompt)} task={task} />
					))}
				</div>
			</div>
		)
	}
}