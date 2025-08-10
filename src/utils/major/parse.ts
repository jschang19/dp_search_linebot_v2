import { ModeOptions } from "@/types/major";
import { getUniversityCode } from "./search";

const SPECIAL_WORD = '中山';

export const parseSearchTerms = async (userMessage: string) => {
	const searchMode = extractSearchMode(userMessage);
	if (searchMode) {
		userMessage = removeKeywords(userMessage);
	}

	if(userMessage.startsWith("國立")) {
		userMessage = userMessage.replace("國立", "");
	}

	let university = extractUniversity(userMessage);
	let universityCode: string | null = null;

	// Differentiate between nsysu and csmu using regex
	const regex = new RegExp(`${SPECIAL_WORD}(醫)?`);
	const match = userMessage.match(regex);

	if (match) {
		if (match[1]) {
			// 中山醫學大學
			universityCode = 'csmu';
			university = determineCsmuName(userMessage);

		} else {
			universityCode = 'nsysu'; // 中山大學
		}
	} else {
		universityCode = await getUniversityCode(university);
	}

	const major = extractMajor(userMessage, university);

	return {
		university,
		universityCode,
		major,
		searchMode,
	};
};

const extractUniversity = (message: string): string => {
	message = message.replace("台", "臺");
	// remove national
	const universityRegex = /(?:國立)?(.*?)大學/;
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


const determineCsmuName = (message: string): string => {
 // first check if is 中山醫學系
 // if not, then check if is 中山醫學大學 in the message
 // if not treat it as 中山醫
 const NORMAL_CSMU_NAME = "中山醫";
 const CSMU_MEDICAL_NAME = "中山醫學大學";
 const CSMU_MEDICAL_DEPARTMENT_NAME = "中山醫學系";

 if (message.includes(CSMU_MEDICAL_DEPARTMENT_NAME)) {
	// the department is medical, we set the code to csmu already
	return NORMAL_CSMU_NAME.slice(0, 2);
 } else if (message.includes(CSMU_MEDICAL_NAME)) {
	return CSMU_MEDICAL_NAME;
 } else {
	return NORMAL_CSMU_NAME;
 }
};
