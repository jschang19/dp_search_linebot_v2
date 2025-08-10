import { parseSearchTerms } from "../utils/major/parse";

describe("Test parseSearchTerms with sepicfic university", () => {
	it("should return correct search terms", async () => {
		const test = "台大資管";
		const actual = await parseSearchTerms(test);
		const expected = {
			university: "臺大",
			universityCode: "ntu",
			major: "資管",
			searchMode: null,
		};

		expect(actual).toEqual(expected);
	});

	it("should return correct search terms", async () => {
		const test = "個申台大資管";
		const actual = await parseSearchTerms(test);
		const expected = {
			university: "臺大",
			universityCode: "ntu",
			major: "資管",
			searchMode: "cac",
		};

		expect(actual).toEqual(expected);
	});

	it("should return correct search terms with assigned search mode", async () => {
		const test = "繁星台大資管";
		const actual = await parseSearchTerms(test);
		const expected = {
			university: "臺大",
			universityCode: "ntu",
			major: "資管",
			searchMode: "star",
		};

		expect(actual).toEqual(expected);
	});

	it("should return correct search terms with assigned search mode", async () => {
		const test = "分科台大資管";
		const actual = await parseSearchTerms(test);
		const expected = {
			university: "臺大",
			universityCode: "ntu",
			major: "資管",
			searchMode: "uac",
		};

		expect(actual).toEqual(expected);
	});
});

describe("Test parseSearchTerms with no sepicfic university", () => {
	it("should return correct search terms", async () => {
		const test = "台大資管";
		const actual = await parseSearchTerms(test);
		const expected = {
			university: "臺大",
			universityCode: "ntu",
			major: "資管",
			searchMode: null,
		};

		expect(actual).toEqual(expected);
	});
});

describe("Test parseSearchTerms with national university", () => {
	it("should return correct search terms", async () => {
		const test = "國立台灣大學資管";
		const actual = await parseSearchTerms(test);
		const expected = {
			university: "臺灣大學",
			universityCode: "ntu",
			major: "資管",
			searchMode: null,
		};

		expect(actual).toEqual(expected);
	});
});

describe("Test parseSearchTerms with special university cases", () => {
	it("should correctly identify 中山大學", async () => {
		const test = "中山資管";
		const actual = await parseSearchTerms(test);
		const expected = {
			university: "中山",
			universityCode: "nsysu",
			major: "資管",
			searchMode: null,
		};

		expect(actual).toEqual(expected);
	});

	it("should correctly identify 中山醫學大學", async () => {
		const test = "中山醫資管";
		const actual = await parseSearchTerms(test);
		const expected = {
			university: "中山醫",
			universityCode: "csmu",
			major: "資管",
			searchMode: null,
		};

		expect(actual).toEqual(expected);
	});


	it("should correctly identify 中山醫學大學", async () => {
		const test = "中山醫學大學資管";
		const actual = await parseSearchTerms(test);
		const expected = {
			university: "中山醫學大學",
			universityCode: "csmu",
			major: "資管",
			searchMode: null,
		};

		expect(actual).toEqual(expected);
	});

	it("should correctly identify 中山醫學大學 with search mode", async () => {
		const test = "個申中山醫資管";
		const actual = await parseSearchTerms(test);
		const expected = {
			university: "中山醫",
			universityCode: "csmu",
			major: "資管",
			searchMode: "cac",
		};

		expect(actual).toEqual(expected);
	});
});
