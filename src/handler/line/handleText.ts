import { MessageEvent, TextEventMessage, Message } from "@line/bot-sdk";
import { parseSearchTerms, searchInfo } from "@/utils/search";
import { ResultMessage, TextMessage, StarResultMessage } from "@/utils/line/message";
import { MessageContent } from "@/config";
import { Major, StarMajor } from "@/types/major";

const handleText = async (event: MessageEvent): Promise<Message | Message[] | null> => {
	try {
		const userMessage: string = (event.message as TextEventMessage).text;
		const userId = event.source.userId;

		if (userMessage === "hi") {
			const reply = TextMessage("hi there");
			return reply;
		}
		const parsedTerms = await parseSearchTerms(userMessage);
		console.log(
			JSON.stringify({
				severity: "INFO",
				message: `parsedTerms: \n${JSON.stringify(parsedTerms)}`,
			})
		);
		if (!parsedTerms.universityCode) return TextMessage(MessageContent.UniversityNotFound);

		const results = await searchInfo({
			university: parsedTerms.university,
			universityCode: parsedTerms.universityCode,
			major: parsedTerms.major,
			searchMode: parsedTerms.searchMode ?? "cac",
		});

		const userSearchMode = parsedTerms.searchMode ?? "cac";
		if (results.error === 2) return TextMessage(MessageContent.MajorNotFound);

		switch (userSearchMode) {
			case "cac":
				const flexMessage = ResultMessage(results.university!, results.data! as Major[]);
				return [TextMessage(`搜尋結果：${results.data!.length} 筆`), flexMessage];
			case "star":
				const starFlexMessage = StarResultMessage(results.university!, results.data! as StarMajor[]);
				return [TextMessage(`搜尋結果：${results.data!.length} 筆`), starFlexMessage];
			default:
				return TextMessage(MessageContent.Error.default);
		}
	} catch (error: unknown) {
		console.log(
			JSON.stringify({
				severity: "ERROR",
				message: `handleText error: \n${error instanceof Error ? error.message : error}`,
			})
		);
		return TextMessage(MessageContent.Error.default);
	}
};

export default handleText;
