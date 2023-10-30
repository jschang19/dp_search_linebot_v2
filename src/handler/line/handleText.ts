import { MessageEvent, TextEventMessage, Message } from "@line/bot-sdk";
import { parseSearchTerms, searchInfo } from "@/utils/search";
import { ResultMessage, TextMessage } from "@/utils/line/message";

const handleText = async (event: MessageEvent): Promise<Message | null> => {
	try {
		const userMessage: string = (event.message as TextEventMessage).text;
		const userId = event.source.userId;

		if (userMessage === "hi") {
			const reply = TextMessage("hi there");
			return reply;
		}
		const parsedTerms = await parseSearchTerms(userMessage);
		if (!parsedTerms.universityCode) return TextMessage("沒有這間學校的資料");

		const results = await searchInfo({
			university: parsedTerms.university,
			universityCode: parsedTerms.universityCode,
			major: parsedTerms.major,
			searchMode: parsedTerms.searchMode,
		});

		if (results.error === 1) return TextMessage("沒有這間學校的資料");
		else if (results.error === 2) return TextMessage("沒有這個系所的資料");

		const flexMessage = ResultMessage(results.university!, results.data!);
		return flexMessage;
	} catch (error: unknown) {
		console.log(
			JSON.stringify({
				severity: "ERROR",
				message: `handleText error: \n${error instanceof Error ? error.message : error}`,
			})
		);
		return TextMessage("發生錯誤，請稍後再試");
	}
};

export default handleText;
