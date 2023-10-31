import { UacMajor, StarMajor } from "@/types/major";
import { getSavedMajorsInfo } from "@utils/major/search";

describe("Test getSavedMajorsInfo function", () => {
	it("should return correct cac saved majors info", async () => {
		const test = [
			{ universityId: "ntu", majorId: "001552" },
			{ universityId: "ntu", majorId: "001592" },
		];
		const testType = "cac";
		const actual = await getSavedMajorsInfo(test, testType);
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

		expect(actual[0].university).toEqual("ntu");
		expect(actual[0].fullName).toEqual("國立臺灣大學資訊管理學系(001552)");
		expect(actual[0].code).toEqual("001552");
	});

	it("should return correct star saved majors info", async () => {
		const test = [
			{ universityId: "ntu", majorId: "00138" },
			{ universityId: "ntu", majorId: "00139" },
		];
		const testType = "star";

		const actual = (await getSavedMajorsInfo(test, testType)) as StarMajor[];
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

		expect(actual[0].university).toEqual("ntu");
		expect(actual[0].fullName).toEqual("國立臺灣大學資訊管理學系(00138)");
		expect(actual[0].code).toEqual("00138");
	});

	it("should return correct uac saved majors info", async () => {
		const test = [
			{ universityId: "ntu", majorId: "128" },
			{ universityId: "ntu", majorId: "129" },
		];

		const testType = "uac";
		const actual = (await getSavedMajorsInfo(test, testType)) as UacMajor[];
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

		expect(actual[0].university).toEqual("ntu");
		expect(actual[0].fullName).toEqual("國立臺灣大學資訊管理學系");
		expect(actual[0].code).toEqual("128");

		expect(actual[0].orders).toBeInstanceOf(Array);
		expect(actual[0].orders.length).toBeGreaterThan(0);
	});
});
