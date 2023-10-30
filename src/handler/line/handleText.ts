import { MessageEvent, TextEventMessage, Message } from "@line/bot-sdk";
import { parseSearchTerms, searchInfo } from "@/utils/search";
import { ResultMessage, TextMessage, StarResultMessage } from "@/utils/line/message";
import { MessageContent } from "@/config";
import { Major, StarMajor } from "@/types/major";
import logMessage from "@/utils/log";

const handleText = async (event: MessageEvent): Promise<Message | Message[] | null> => {
	try {
		const { text: userMessage } = event.message as TextEventMessage;

		const parsedTerms = await parseSearchTerms(userMessage);

		if (!parsedTerms.universityCode) return TextMessage(MessageContent.UniversityNotFound);

		const results = await searchInfo({
			university: parsedTerms.university,
			universityCode: parsedTerms.universityCode,
			major: parsedTerms.major,
			searchMode: parsedTerms.searchMode ?? "cac",
		});

		if (!results.university) return TextMessage(MessageContent.MajorNotFound);

		return generateResponseMessage(parsedTerms.searchMode ?? "cac", results);
	} catch (error: unknown) {
		logMessage("ERROR", `handleText error: \n${error instanceof Error ? error.message : error}`);
		return TextMessage(MessageContent.Error.default);
	}
};

const generateResponseMessage = (
	searchMode: string,
	results: {
		university: string;
		data: (Major | StarMajor)[];
	}
) => {
	const countMessage = TextMessage(`搜尋結果：${results.data!.length} 筆`);

	switch (searchMode) {
		case "cac":
			return [countMessage, ResultMessage(results.university!, results.data! as Major[])];
		case "star":
			return [countMessage, StarResultMessage(results.university!, results.data! as StarMajor[])];
		default:
			return TextMessage(MessageContent.Error.default);
	}
};

export default handleText;
