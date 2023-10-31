import { setGoogleCalendarURL, setUniversityTWURL, setPortfolioURL } from "../utils/setUrl";

describe("test setGoogleCalendarURL", () => {
	it("should return correct url", () => {
		const testDate = "112.07.05至112.07.09";
		const eventName = "test event";
		const result = setGoogleCalendarURL(testDate, eventName);

		const expected = `https://calendar.google.com/calendar/u/0/render?action=TEMPLATE&dates=20230705T000000Z/20230709T090000Z&text=test%20event%E4%BA%8C%E9%9A%8E%E7%94%84%E8%A9%A6&details=test%20event%E4%BA%8C%E9%9A%8E%E9%9D%A2%E8%A9%A6%E7%9A%84%E6%97%A5%E6%9C%9F%EF%BC%8C%E6%BA%96%E7%A2%BA%E6%99%82%E9%96%93%E8%AB%8B%E4%BE%9D%E7%85%A7%E5%90%84%E6%A0%A1%E7%9A%84%E6%AD%A3%E5%BC%8F%E9%9D%A2%E8%A9%A6%E7%B0%A1%E7%AB%A0%E7%82%BA%E4%B8%BB%E3%80%82`;

		expect(result).toBe(expected);
	});
});

describe("test setUniversityTWURL", () => {
	it("should return correct url in caac", () => {
		const type = "cac";
		const majorCode = "001111";
		const result = setUniversityTWURL(type, majorCode);

		const expected = encodeURI(`https://university-tw.ldkrsi.men/caac/001/001111`);
		expect(result).toBe(expected);
	});

	it("should return correct url in star", () => {
		const type = "star";
		const majorCode = "00111";
		const result = setUniversityTWURL(type, majorCode);
		const expected = encodeURI(`https://university-tw.ldkrsi.men/star/001/00111`);
		expect(result).toBe(expected);
	});

	it("should occur error if code is invalid", () => {
		const type = "cac";
		const majorCode = "001";
		expect(() => setUniversityTWURL(type, majorCode)).toThrow();
	});
});

describe("test setPortfolioURL", () => {
	it("should return correct url", () => {
		const testFullName = "國立臺灣大學工商管理學系科技管理組(001512)";
		const result = setPortfolioURL(testFullName);
		const expected = `https://www.cac.edu.tw/cacportal/jbcrc/LearningPortfolios_MultiQuery_ppa/LPM_readfile_html.php?fileid=001-%E5%9C%8B%E7%AB%8B%E8%87%BA%E7%81%A3%E5%A4%A7%E5%AD%B8-%E5%B7%A5%E5%95%86%E7%AE%A1%E7%90%86%E5%AD%B8%E7%B3%BB%E7%A7%91%E6%8A%80%E7%AE%A1%E7%90%86%E7%B5%84`;

		expect(result).toBe(expected);
	});
});
