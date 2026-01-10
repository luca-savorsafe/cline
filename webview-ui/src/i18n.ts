import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"
import deTranslations from "./locales/de/translation.json"
// Import translations
import enTranslations from "./locales/en/translation.json"
import esTranslations from "./locales/es/translation.json"
import frTranslations from "./locales/fr/translation.json"
import jaTranslations from "./locales/ja/translation.json"
import koTranslations from "./locales/ko/translation.json"
import zhCNTranslations from "./locales/zh-CN/translation.json"

// Language code mapping from preferredLanguage values
const languageCodeMap: Record<string, string> = {
	English: "en",
	"Simplified Chinese - 简体中文": "zh-CN",
	"Traditional Chinese - 繁體中文": "zh-TW",
	"Japanese - 日本語": "ja",
	"Korean - 한국어": "ko",
	"Spanish - Español": "es",
	"German - Deutsch": "de",
	"French - Français": "fr",
	"Arabic - العربية": "ar",
	"Portuguese - Português (Brasil)": "pt-BR",
	"Czech - Čeština": "cs",
	"Hindi - हिन्दी": "hi",
	"Hungarian - Magyar": "hu",
	"Italian - Italiano": "it",
	"Polish - Polski": "pl",
	"Portuguese - Português (Portugal)": "pt-PT",
	"Russian - Русский": "ru",
	"Turkish - Türkçe": "tr",
}

// Function to get language code from preferredLanguage
export const getLanguageCode = (preferredLanguage: string | undefined): string => {
	if (!preferredLanguage) return "en"
	return languageCodeMap[preferredLanguage] || "en"
}

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				translation: enTranslations,
			},
			"zh-CN": {
				translation: zhCNTranslations,
			},
			ja: {
				translation: jaTranslations,
			},
			ko: {
				translation: koTranslations,
			},
			es: {
				translation: esTranslations,
			},
			de: {
				translation: deTranslations,
			},
			fr: {
				translation: frTranslations,
			},
		},
		fallbackLng: "en",
		interpolation: {
			escapeValue: false, // React already safes from XSS
		},
		detection: {
			order: ["localStorage", "navigator"],
			caches: ["localStorage"],
		},
	})

// Function to change language
export const changeLanguage = (preferredLanguage: string) => {
	const langCode = getLanguageCode(preferredLanguage)
	return i18n.changeLanguage(langCode)
}

export default i18n
