import { describe, expect, it } from "vitest"
import { ErrorBlockTitle } from "../ErrorBlockTitle"

// Mock translation function
const mockT = (key: string) => {
	const translations: Record<string, string> = {
		"errorBlock.apiRequest": "API Request...",
		"errorBlock.apiRequestCancelled": "API Request Cancelled",
		"errorBlock.apiRequestFailed": "API Request Failed",
		"errorBlock.creditLimitReached": "Credit Limit Reached",
	}
	return translations[key] || key
}

describe("ErrorBlockTitle", () => {
	it("should return icon and title for API request cancelled", () => {
		const [icon, title] = ErrorBlockTitle({
			apiReqCancelReason: "user_cancelled",
			t: mockT,
		})

		expect(icon).toBeDefined()
		expect(title).toBeDefined()
	})

	it("should return icon and title for completed API request", () => {
		const [icon, title] = ErrorBlockTitle({
			cost: 0.001,
			t: mockT,
		})

		expect(icon).toBeDefined()
		expect(title).toBeDefined()
	})

	it("should return icon and title for failed API request", () => {
		const [icon, title] = ErrorBlockTitle({
			apiRequestFailedMessage: "Request failed",
			t: mockT,
		})

		expect(icon).toBeDefined()
		expect(title).toBeDefined()
	})

	it("should return icon and title for retry status", () => {
		const [icon, title] = ErrorBlockTitle({
			retryStatus: {
				attempt: 2,
				maxAttempts: 3,
				delaySec: 5,
			},
			t: mockT,
		})

		expect(icon).toBeDefined()
		expect(title).toBeDefined()
	})

	it("should return icon and title for default API request", () => {
		const [icon, title] = ErrorBlockTitle({
			t: mockT,
		})

		expect(icon).toBeDefined()
		expect(title).toBeDefined()
	})
})
