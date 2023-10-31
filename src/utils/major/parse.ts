import { ModeOptions } from "@/types/major";
import { getUniversityCode } from "./search";

export const parseSearchTerms = async (userMessage: string) => {
	const searchMode = extractSearchMode(userMessage);

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

const extractSearchMode = (message: string): ModeOptions | null => {
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
