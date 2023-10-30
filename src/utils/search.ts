import csv from "csv-parser";
import fs from "fs";
import Fuse from "fuse.js";
import { University } from "@/types/university";
import { Major, rawMajor } from "@/types/major";

export const searchInfo = async (parsedTerms: {
	university: string;
	universityCode: string;
	major: string;
	searchMode: number;
}) => {
	const { university, universityCode, major } = parsedTerms;
	if (!universityCode) return { error: 1 }; // 1: 沒有這間大學
	const allMajors = await getAllMajors(universityCode);
	const results = filterMajors(allMajors, major);
	if (results.length === 0) return { error: 2 }; // 2: 沒有這個系所
	return {
		university,
		data: parseMajorInfo(results),
	};
};

export const parseSearchTerms = async (userMessage: string) => {
	const university = extractUniversity(userMessage);
	const major = extractMajor(userMessage, university);
	const universityCode = await getUniversityCode(university);

	return {
		university,
		universityCode,
		major,
		searchMode: 1,
	};
};

const extractUniversity = (message: string): string => {
	message = message.replace("台", "臺");
	const universityRegex = /(.*?)大學/;
	const match = message.match(universityRegex);
	return match ? match[0] : message.slice(0, 2);
};

const extractMajor = (message: string, university: string): string => {
	let major = message.slice(university.length).replace("大學", "");
	const majorRegex = /學系$|系$/;
	const match = major.match(majorRegex);
	return match ? major.slice(0, -match[0].length) : major;
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

const getAllMajors = async (universityCode: string) => {
	// open csv file with universityCode
	// then parse the csv file to get the major info
	// return the major info
	const data = (await readCSV(`./data/cac/${universityCode}.csv`)) as rawMajor[];
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
	results: {
		item: rawMajor;
	}[]
): Major[] => {
	return results.map((result: any) => {
		return {
			fullName: result.item.校系名稱及代碼,
			numRecruit: result.item.招生名額,
			numReview: result.item.預計甄試人數,
			numIsland: result.item.離島外加名額,
			date: result.item.指定項目甄試日期,
			url: result.item.科系校系分則網址,
			unewsUrl: result.item.大學問網址,
		};
	});
};
