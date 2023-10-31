import Fuse from "fuse.js";
import { University } from "@/types/university";
import {
	CacMajor,
	rawMajor,
	StarMajor,
	rawStarMajor,
	UacMajor,
	rawUacMajor,
	ModeOptions,
	rawCacMajor,
} from "@/types/major";
import readCSV from "@/utils/readCsv";

export const searchInfo = async ({
	universityCode,
	major,
	searchMode,
}: {
	universityCode: string;
	major: string;
	searchMode: ModeOptions;
}) => {
	const allMajors = await getAllMajors(searchMode, universityCode);
	const results = filterMajors(allMajors, major);

	if (!results.length) return [];

	return parseMajorInfo(
		searchMode,
		results.map((r) => ({
			...r,
			university: universityCode,
		}))
	);
};

export const getUniversityCode = async (university: string): Promise<string | null> => {
	const results = (await readCSV("./data/code.csv")) as University[];
	const { code } = results.find(({ search_word }) => search_word.includes(university)) || {};
	return code || null;
};

export async function getAllMajors(searchMode: ModeOptions, universityCode: string) {
	// open csv file with universityCode
	// then parse the csv file to get the major info
	const data: rawMajor[] = (await readCSV(`./data/${searchMode}/${universityCode}.csv`)) as rawMajor[];

	// return different type of major info based on searchMode
	switch (searchMode) {
		case "cac":
			return data as rawCacMajor[];
		case "star":
			return data as rawStarMajor[];
		case "uac":
			return data as rawUacMajor[];
		default:
			return [];
	}
}

export const getSavedMajorsInfo = async (saved: { universityId: string; majorId: string }[], type: ModeOptions) => {
	// Return early if there are no saved majors.
	if (!saved.length) return [];

	try {
		const majorPromises = saved.map(async ({ universityId, majorId }) => {
			const allMajors = await getAllMajors(type, universityId);
			const major = allMajors.find((major) =>
				(type === "uac" ? major.校系代碼 : major.校系名稱及代碼).includes(majorId)
			);

			return major ? { ...major, university: universityId } : null;
		});

		const allResults = await Promise.all(majorPromises);
		// remove null values
		const validResults = allResults.filter(Boolean) as rawMajor[];

		return parseMajorInfo(type, validResults);
	} catch (error) {
		console.error("Error fetching saved majors:", error);
		return [];
	}
};

const filterMajors = (allMajors: rawMajor[], major: string) => {
	if (!allMajors || !major) {
		throw new Error("allMajors and major are required");
	}

	const options = {
		includeScore: true,
		shouldSort: true,
		tokenize: true,
		matchAllTokens: true,
		includeMatches: true,
		keys: ["搜尋關鍵字", "校系名稱及代碼"],
	};

	const fuse = new Fuse(allMajors, options);
	const results = fuse.search(major);
	const filiteredResults = results.filter((item) => {
		// A score of 0indicates a perfect match,
		// while a score of 1 indicates a complete mismatch.
		return item.score! < 0.15;
	});

	// early return if there are results exactly match the major
	if (filiteredResults.length !== 0) {
		// flatten the array
		return filiteredResults.map((result) => {
			return result.item;
		});
	}

	const extensiveFiliteredResults = results.filter((item) => {
		// A score of 0indicates a perfect match,
		// while a score of 1 indicates a complete mismatch.
		return item.score! <= 0.25;
	});

	// flatten the array
	if (extensiveFiliteredResults.length !== 0) {
		return extensiveFiliteredResults.map((result) => {
			return result.item;
		});
	}

	// return empty array if there are no results
	return [];
};

const parseMajorInfo = (
	searchMode: ModeOptions,
	results: rawMajor[] | rawStarMajor[] | rawUacMajor[]
): CacMajor[] | StarMajor[] | UacMajor[] => {
	switch (searchMode) {
		case "cac":
			return parseCacMajorInfo(results as rawCacMajor[]);
		case "star":
			return parseStarMajorInfo(results as rawStarMajor[]);
		case "uac":
			return parseUacMajorInfo(results as rawUacMajor[]);
		default:
			return [];
	}
};

const parseCacMajorInfo = (results: rawCacMajor[]): CacMajor[] => {
	return results.map((r) => {
		const code = r.校系名稱及代碼.match(/\d/g);
		return {
			university: r.university!,
			code: code ? code.join("") : "000000",
			fullName: r.校系名稱及代碼!,
			numRecruit: r.招生名額!,
			numReview: r.預計甄試人數!,
			numIsland: r.離島外加名額!,
			date: r.指定項目甄試日期!,
			url: r.科系校系分則網址!,
			unewsUrl: r.大學問網址!,
		};
	});
};

const parseStarMajorInfo = (results: rawStarMajor[]): StarMajor[] => {
	return results.map((r) => {
		const code = r.校系名稱及代碼.match(/\d/g);
		return {
			university: r.university!,
			code: code ? code.join("") : "000000",
			fullName: r.校系名稱及代碼!,
			numRecruit: r.招生名額!,
			numExtra: r.外加名額!,
			field: r.學群類別!,
			numChoice: r.招生名額各學群可選填志願數!,
			numExtraChoice: r.外加名額各學群可選填志願數!,
			url: r.校系分則詳細資料!,
			unewsUrl: r.大學問網址!,
		};
	});
};

const parseUacMajorInfo = (results: rawUacMajor[]): UacMajor[] => {
	return results.map((r) => {
		return {
			university: r.university!,
			code: r.校系代碼!,
			fullName: r.校系名稱!,
			orders: [r["順序 1"]!, r["順序 2"]!, r["順序 3"]!, r["順序 4"]!, r["順序 5"]!],
			referScore: r.學測採計!,
			englishListening: r.英聽!,
			url: r.校系分則!,
			lastYearScore: r.去年分數!,
		};
	});
};
