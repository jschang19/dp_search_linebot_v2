import { TextMessage } from "@utils/line/message";

describe("Test TextMessage function", () => {
	it("should return correct text message", () => {
		const test = "test";
		const actual = TextMessage(test);
		expect(actual).toHaveProperty("type");
		expect(actual).toHaveProperty("text");
		expect(actual.type).toEqual("text");
		expect(actual.text).toEqual(test);
	});

	it("should throw an error with no text", () => {
		try {
			const actual = TextMessage("");
		} catch (error) {
			expect(error).toBeInstanceOf(Error);
		}
	});
});
