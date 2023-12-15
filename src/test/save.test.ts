import { UacMajor, StarMajor } from "@/types/major";
import { parseSavedMajor } from "@utils/major/search";

describe("Test parseSavedMajor function", () => {
	it("should return correct cac saved majors info", async () => {
		const test = [
			{
				aboriginal: '1',
				expected_candidate: 1,
				fee: 100,
				full_name: '資訊管理學系',
				gender_requirement: '無',
				has_exam: '無',
				key: '001552',
				outlying: '0',
				recruit: 1,
				review_date: '2021-07-01',
				support_measure: '無',
				type: '一般',
				university_code: 'ntu',
				url: 'https://www.cac.edu.tw/apply108/system/108_college_list/NTU/NTU_128.html',
				view_count: 0,
				vision: '無',
				universities: {
					full_name: '國立臺灣大學',
				},
			}
		];
		const testType = "cac";
		const actual = parseSavedMajor(test, testType);
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

		expect(actual[0].university).toEqual("ntu");
		expect(actual[0].fullName).toEqual("國立臺灣大學資訊管理學系");
		expect(actual[0].key).toEqual("001552");
	});

	it("should return correct star saved majors info", async () => {
		const test = [
			{
				additional_quota_allowed: '無',
				additional_recruit: '無',
				full_name: '資訊管理學系',
				group: '二類',
				key: '00138',
				quota_allowed: '無',
				recruit: "1",
				university_code: 'ntu',
				url: 'https://www.cac.edu.tw/apply108/system/108_college_list/NTU/NTU_128.html',
				view_count: 0,
				universities: {
					full_name: '國立臺灣大學',
				},
			  }
		];
		const testType = "star";

		const actual = parseSavedMajor(test, testType);
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

		expect(actual[0].university).toEqual("ntu");
		expect(actual[0].fullName).toEqual("國立臺灣大學資訊管理學系");
		expect(actual[0].key).toEqual("00138");
	});

	it("should return correct uac saved majors info", async () => {
		const test = [
			{
				ceec_test: "否",
				english_listening: "無",
				full_name: "資訊管理學系",
				key: "128",
				last_year: "https://www.cac.edu.tw/apply108/system/108_college_list/NTU/NTU_128.html",
				order1: "1",
				order2: "2",
				order3: "3",
				order4: "4",
				order5: "5",
				redirect_url: "https://www.cac.edu.tw/apply108/system/108_college_list/NTU/NTU_128.html",
				university_code: "ntu",
				view_count: 0,
				universities: {
					full_name: "國立臺灣大學",
				},
			  }
		];

		const testType = "uac";
		const actual = parseSavedMajor(test, testType) as UacMajor[];
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
		expect(actual[0].key).toEqual("128");

		expect(actual[0].orders).toBeInstanceOf(Array);
		expect(actual[0].orders.length).toBeGreaterThan(0);
	});
});
