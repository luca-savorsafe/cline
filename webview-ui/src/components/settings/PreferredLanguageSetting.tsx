import { VSCodeDropdown, VSCodeOption } from "@vscode/webview-ui-toolkit/react"
import React from "react"
import { useTranslation } from "react-i18next"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { updateSetting } from "./utils/settingsHandlers"

const PreferredLanguageSetting: React.FC = () => {
	const { preferredLanguage } = useExtensionState()
	const { t } = useTranslation()

	const handleLanguageChange = (newLanguage: string) => {
		updateSetting("preferredLanguage", newLanguage)
	}

	return (
		<div style={{}}>
			<label className="block mb-1 text-base font-medium" htmlFor="preferred-language-dropdown">
				{t("settings.language.title")}
			</label>
			<VSCodeDropdown
				currentValue={preferredLanguage || "English"}
				id="preferred-language-dropdown"
				onChange={(e: any) => {
					handleLanguageChange(e.target.value)
				}}
				style={{ width: "100%" }}>
				<VSCodeOption value="English">{t("settings.language.english")}</VSCodeOption>
				<VSCodeOption value="Arabic - العربية">{t("settings.language.arabic")}</VSCodeOption>
				<VSCodeOption value="Portuguese - Português (Brasil)">{t("settings.language.portugueseBR")}</VSCodeOption>
				<VSCodeOption value="Czech - Čeština">{t("settings.language.czech")}</VSCodeOption>
				<VSCodeOption value="French - Français">{t("settings.language.french")}</VSCodeOption>
				<VSCodeOption value="German - Deutsch">{t("settings.language.german")}</VSCodeOption>
				<VSCodeOption value="Hindi - हिन्दी">{t("settings.language.hindi")}</VSCodeOption>
				<VSCodeOption value="Hungarian - Magyar">{t("settings.language.hungarian")}</VSCodeOption>
				<VSCodeOption value="Italian - Italiano">{t("settings.language.italian")}</VSCodeOption>
				<VSCodeOption value="Japanese - 日本語">{t("settings.language.japanese")}</VSCodeOption>
				<VSCodeOption value="Korean - 한국어">{t("settings.language.korean")}</VSCodeOption>
				<VSCodeOption value="Polish - Polski">{t("settings.language.polish")}</VSCodeOption>
				<VSCodeOption value="Portuguese - Português (Portugal)">{t("settings.language.portuguesePT")}</VSCodeOption>
				<VSCodeOption value="Russian - Русский">{t("settings.language.russian")}</VSCodeOption>
				<VSCodeOption value="Simplified Chinese - 简体中文">{t("settings.language.simplifiedChinese")}</VSCodeOption>
				<VSCodeOption value="Spanish - Español">{t("settings.language.spanish")}</VSCodeOption>
				<VSCodeOption value="Traditional Chinese - 繁體中文">{t("settings.language.traditionalChinese")}</VSCodeOption>
				<VSCodeOption value="Turkish - Türkçe">{t("settings.language.turkish")}</VSCodeOption>
			</VSCodeDropdown>
			<p className="text-sm text-description mt-1">{t("settings.language.description")}</p>
		</div>
	)
}

export default React.memo(PreferredLanguageSetting)