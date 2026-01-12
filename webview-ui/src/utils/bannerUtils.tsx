import { BannerAction, BannerCardData } from "@shared/cline/banner"
import { DynamicIcon } from "lucide-react/dynamic"
import React from "react"
import { BannerData } from "@/components/common/BannerCarousel"

/**
 * Convert BannerCardData to BannerData for rendering
 */
export function convertBannerData(
	banner: BannerCardData,
	handlers: {
		onAction: (action: BannerAction) => void
		onDismiss: (bannerId: string) => void
	},
	t: (key: string, options?: { defaultValue?: string }) => string,
): BannerData {
	const { onAction, onDismiss } = handlers

	// Filter and process actions
	const filteredActions =
		banner.actions?.map((action) => ({
			label: t(action.title, { defaultValue: action.title }),
			onClick: () => onAction(action),
		})) || []

	// Helper function to translate text or return as-is
	const translateText = (text: string): string => {
		// Check if the text looks like a translation key (contains dots or starts with specific prefix)
		if (text.includes(".") && text.startsWith("banner.")) {
			return t(text, { defaultValue: text })
		}
		return text
	}

	return {
		id: banner.id,
		icon: banner.icon ? (
			<DynamicIcon className="size-4" name={banner.icon as React.ComponentProps<typeof DynamicIcon>["name"]} />
		) : undefined,
		title: translateText(banner.title),
		description: translateText(banner.description),
		actions: filteredActions.length > 0 ? filteredActions : undefined,
		onDismiss: () => onDismiss(banner.id),
	}
}
