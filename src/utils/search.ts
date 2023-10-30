import csv from "csv-parser";
import fs from "fs";
import Fuse from "fuse.js";
import { University } from "@/types/university";
import { Major, rawMajor, StarMajor, rawStarMajor } from "@/types/major";

export const searchInfo = async (parsedTerms: {
	university: string;
	universityCode: string;
	major: string;
	searchMode: "cac" | "uac" | "star";
}) => {
	const { university, universityCode, major, searchMode } = parsedTerms;
	if (!universityCode) return { error: 1 }; // 1: 沒有這間大學
	const allMajors = await getAllMajors(searchMode, universityCode);
	const results = filterMajors(allMajors, major);
	if (results.length === 0) return { error: 2 }; // 2: 沒有這個系所
	return {
		university,
		data: parseMajorInfo(searchMode, results),
	};
};

export const parseSearchTerms = async (userMessage: string) => {
	const searchMode = extractSearchMode(userMessage);

	console.log("searchMode: ", searchMode);

	if (searchMode) {
		userMessage = removeKeywords(userMessage);
	}

	const university = extractUniversity(userMessage);
	const major = extractMajor(userMessage, university);
	const universityCode = await getUniversityCode(university);

	return {
		university,
		universityCode,
		major,
		searchMode: searchMode,
	};
};

const extractUniversity = (message: string): string => {
	message = message.replace("台", "臺");
	const universityRegex = /(.*?)大學/;
	const match = message.match(universityRegex);
	return match ? match[0] : message.slice(0, 2);
};

const extractMajor = (message: string, university: string): string => {
	const major = message.slice(university.length).replace("大學", "");
	const majorRegex = /學系$|系$/;
	const match = major.match(majorRegex);
	return match ? major.slice(0, -match[0].length) : major;
};

const extractSearchMode = (message: string): "cac" | "uac" | "star" | null => {
	// use includes instead of switch
	if (message.includes("個申") || message.includes("個人申請")) {
		return "cac";
	} else if (message.includes("繁星")) {
		return "star";
	} else if (message.includes("分科") || message.includes("指考")) {
		return "uac";
	} else {
		return null;
	}
};

const removeKeywords = (message: string): string => {
	const mode = extractSearchMode(message);
	let keywords: string[] = [];

	switch (mode) {
		case "cac":
			keywords = ["個申", "個人申請"];
			break;
		case "star":
			keywords = ["繁星"];
			break;
		case "uac":
			keywords = ["分科", "指考"];
			break;
		default:
			return message; // 如果不匹配任何模式，則直接返回原始消息
	}

	// 從消息中移除所有關鍵字
	for (const keyword of keywords) {
		message = message.replace(new RegExp(keyword, "g"), "");
	}

	return message.trim(); // 返回已移除關鍵字的消息
};

const readCSV = async (path: string): Promise<unknown[]> => {
	return new Promise((resolve, reject) => {
		const results: unknown[] = [];
		fs.createReadStream(path)
			.pipe(csv())
			.on("data", (data) => results.push(data))
			.on("end", () => resolve(results))
			.on("error", (error) => reject(error));
	});
};

const getUniversityCode = async (university: string): Promise<string | null> => {
	const results = (await readCSV("./data/code.csv")) as University[];
	const { code } = results.find(({ search_word }) => search_word.includes(university)) || {};
	return code || null;
};

const getAllMajors = async (searchMode: string, universityCode: string) => {
	// open csv file with universityCode
	// then parse the csv file to get the major info
	// return the major info
	const data = (await readCSV(`./data/${searchMode}/${universityCode}.csv`)) as rawMajor[];
	return data || [];
};

const filterMajors = (allMajors: rawMajor[], major: string) => {
	if (!allMajors || !major) {
		throw new Error("allMajors and major are required");
	}

	const options = {
		includeScore: true,
		keys: ["搜尋關鍵字"],
	};

	const fuse = new Fuse(allMajors, options);
	const results = fuse.search(major);
	return results.filter((item) => {
		return item.score! < 0.2;
	});
};

const parseMajorInfo = (
	searchMode: "cac" | "uac" | "star",
	results: {
		item: rawMajor;
	}[]
): (Major | StarMajor)[] => {
	switch (searchMode) {
		case "cac":
			return parseCacMajorInfo(results);
		case "star":
			return parseStarMajorInfo(results);
		default:
			return [];
	}
};

const parseCacMajorInfo = (results: { item: rawMajor }[]): Major[] => {
	return results.map(({ item }) => {
		return {
			fullName: item.校系名稱及代碼!,
			numRecruit: item.招生名額!,
			numReview: item.預計甄試人數!,
			numIsland: item.離島外加名額!,
			date: item.指定項目甄試日期!,
			url: item.科系校系分則網址!,
			unewsUrl: item.大學問網址!,
		};
	});
};

const parseStarMajorInfo = (results: { item: rawStarMajor }[]): StarMajor[] => {
	return results.map(({ item }) => {
		return {
			fullName: item.校系名稱及代碼!,
			numRecruit: item.招生名額!,
			numExtra: item.外加名額!,
			field: item.學群類別!,
			numChoice: item.招生名額各學群可選填志願數!,
			numExtraChoice: item.外加名額各學群可選填志願數!,
			url: item.校系分則詳細資料!,
			unewsUrl: item.大學問網址!,
		};
	});
};
