import { ModeOptions, UacMajor, CacMajor, StarMajor } from "@/types/major";
import { searchInfo } from "../utils/major/search";
import readCSV from "../utils/readCsv";

type Options = {
	universityCode: string;
	major: string;
	searchMode: ModeOptions;
};

describe("Test readCsv function", () => {
	it("should return correct csv data", async () => {
		const test = "./data/cac/ntu.csv";
		const actual = await readCSV(test);
		expect(actual).toBeInstanceOf(Array);
	});

	it("should return an error with no file mathced", async () => {
		try {
			const test = "./data/cac/notExist.csv";
			const actual = await readCSV(test);
		} catch (error) {
			expect(error).toBeInstanceOf(Error);
		}
	});
});

describe("Test searchInfo function", () => {
	it("should return correct search results in cac", async () => {
		const test: Options = {
			universityCode: "ntu",
			major: "資管",
			searchMode: "cac",
		};

		const actual = (await searchInfo(test)) as CacMajor[];
		expect(actual).toBeInstanceOf(Array);
		expect(actual.length).toBeGreaterThan(0);
		expect(actual[0]).toHaveProperty("university");
		expect(actual[0]).toHaveProperty("code");
		expect(actual[0]).toHaveProperty("fullName");
		expect(actual[0]).toHaveProperty("numRecruit");
		expect(actual[0]).toHaveProperty("numReview");
		expect(actual[0]).toHaveProperty("numIsland");
		expect(actual[0]).toHaveProperty("date");
		expect(actual[0]).toHaveProperty("url");
		expect(actual[0]).toHaveProperty("unewsUrl");

		expect(typeof actual[0].university).toEqual("string");
		expect(typeof actual[0].code).toEqual("string");
		expect(typeof actual[0].fullName).toEqual("string");
		expect(typeof actual[0].numRecruit).toEqual("string");
		expect(typeof actual[0].numReview).toEqual("string");
		expect(typeof actual[0].numIsland).toEqual("string");
		expect(typeof actual[0].date).toEqual("string");
		expect(typeof actual[0].url).toEqual("string");
		expect(typeof actual[0].unewsUrl).toEqual("string");

		expect(actual[0].university).toEqual("ntu");
		expect(actual[0].fullName).toEqual("國立臺灣大學資訊管理學系(001552)");
		expect(actual[0].code).toEqual("001552");
	});

	it("should return correct search results in star", async () => {
		const test: Options = {
			universityCode: "ntu",
			major: "資管",
			searchMode: "star",
		};

		const actual = (await searchInfo(test)) as StarMajor[];
		expect(actual).toBeInstanceOf(Array);
		expect(actual.length).toBeGreaterThan(0);
		expect(actual[0]).toHaveProperty("university");
		expect(actual[0]).toHaveProperty("code");
		expect(actual[0]).toHaveProperty("fullName");
		expect(actual[0]).toHaveProperty("numRecruit");
		expect(actual[0]).toHaveProperty("numExtra");
		expect(actual[0]).toHaveProperty("numChoice");
		expect(actual[0]).toHaveProperty("numExtraChoice");
		expect(actual[0]).toHaveProperty("field");
		expect(actual[0]).toHaveProperty("url");
		expect(actual[0]).toHaveProperty("unewsUrl");

		expect(typeof actual[0].university).toEqual("string");
		expect(typeof actual[0].code).toEqual("string");
		expect(typeof actual[0].fullName).toEqual("string");
		expect(typeof actual[0].numRecruit).toEqual("string");
		expect(typeof actual[0].numExtra).toEqual("string");
		expect(typeof actual[0].numChoice).toEqual("string");
		expect(typeof actual[0].numExtraChoice).toEqual("string");
		expect(typeof actual[0].field).toEqual("string");
		expect(typeof actual[0].url).toEqual("string");
		expect(typeof actual[0].unewsUrl).toEqual("string");

		expect(actual[0].university).toEqual("ntu");
		expect(actual[0].fullName).toEqual("國立臺灣大學資訊管理學系(00138)");
		expect(actual[0].code).toEqual("00138");
	});

	it("should return correct search results in uac", async () => {
		const test: Options = {
			universityCode: "ntu",
			major: "資管",
			searchMode: "uac",
		};
		const actual = (await searchInfo(test)) as UacMajor[];
		expect(actual).toBeInstanceOf(Array);
		expect(actual.length).toBeGreaterThan(0);
		expect(actual[0]).toHaveProperty("university");
		expect(actual[0]).toHaveProperty("code");
		expect(actual[0]).toHaveProperty("fullName");
		expect(actual[0]).toHaveProperty("orders");
		expect(actual[0]).toHaveProperty("referScore");
		expect(actual[0]).toHaveProperty("englishListening");
		expect(actual[0]).toHaveProperty("url");
		expect(actual[0]).toHaveProperty("lastYearScore");

		expect(typeof actual[0].university).toEqual("string");
		expect(typeof actual[0].code).toEqual("string");
		expect(typeof actual[0].fullName).toEqual("string");
		expect(typeof actual[0].orders).toEqual("object");
		expect(typeof actual[0].referScore).toEqual("string");
		expect(typeof actual[0].englishListening).toEqual("string");
		expect(typeof actual[0].url).toEqual("string");
		expect(typeof actual[0].lastYearScore).toEqual("string");

		expect(actual[0].university).toEqual("ntu");
		expect(actual[0].fullName).toEqual("國立臺灣大學資訊管理學系");
		expect(actual[0].code).toEqual("128");
		expect(actual[0].orders).toBeInstanceOf(Array);
		expect(actual[0].orders.length).toBeGreaterThan(0);
	});

	it("should return empty array with no matched results", async () => {
		const test: Options = {
			universityCode: "ntu",
			major: "大大大優惠！",
			searchMode: "cac",
		};

		const actual = await searchInfo(test);
		expect(actual).toBeInstanceOf(Array);
		expect(actual.length).toBe(0);
	});
});
