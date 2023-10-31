import { MessageEvent, TextEventMessage, Message } from "@line/bot-sdk";
import { parseSearchTerms } from "@/utils/major/parse";
import { searchInfo, getSavedMajorsInfo } from "@/utils/major/search";
import { ResultMessage, StarResultMessage, UacResultMessage } from "@/utils/line/message/resultFlex";
import { TextMessage } from "@/utils/line/message";
import { MessageContent } from "@/config";
import { CacMajor, ModeOptions, StarMajor, UacMajor } from "@/types/major";
import logMessage from "@/utils/cloudFuntionLog";
import { getSave } from "@utils/user/saves";
import { getPreferenceMode, updatePreferenceMode } from "@utils/user/preference";

const handleText = async (event: MessageEvent): Promise<Message | Message[] | null> => {
	try {
		const { text: userMessage } = event.message as TextEventMessage;
		const userId = event.source.userId!;

		const preferenceMode = await getPreferenceMode(userId);
		// initial search mode for first time user
		if (!preferenceMode) {
			await updatePreferenceMode(userId, "cac");
		}

		switch (userMessage) {
			case "收藏":
				return await handleGetSave(userId, preferenceMode ?? "cac");
			default: {
				const parsedTerms = await parseSearchTerms(userMessage);

				if (!parsedTerms.universityCode) return TextMessage(MessageContent.UniversityNotFound);
				if (!parsedTerms.major) return TextMessage(MessageContent.MajorNotFound);

				const majorResults = await searchInfo({
					universityCode: parsedTerms.universityCode,
					major: parsedTerms.major,
					searchMode: parsedTerms.searchMode ?? preferenceMode ?? "cac",
				});

				if (!majorResults.length) return TextMessage(MessageContent.MajorNotFound);

				return generateResponseMessage(parsedTerms.searchMode ?? preferenceMode ?? "cac", majorResults);
			}
		}
	} catch (error: unknown) {
		logMessage("ERROR", `handleText error: \n${error instanceof Error ? error.message : error}`);
		return TextMessage(MessageContent.Error.default);
	}
};

const generateResponseMessage = (searchMode: string, results: (CacMajor | StarMajor | UacMajor)[]) => {
	const countMessage = TextMessage(`以下是找到的校系結果`);

	if (results!.length > 11) {
		results = results!.slice(0, 11);
	}

	switch (searchMode) {
		case "cac":
			return [countMessage, ResultMessage(results as CacMajor[])];
		case "star":
			return [countMessage, StarResultMessage(results as StarMajor[])];
		case "uac":
			return [countMessage, UacResultMessage(results as UacMajor[])];
		default:
			console.log("unexpected search mode: ", searchMode);
			return TextMessage(MessageContent.Error.default);
	}
};

const handleGetSave = async (userId: string, type: ModeOptions) => {
	try {
		const savedMajors = await getSave(userId, type);
		if (savedMajors.length === 0) return TextMessage(MessageContent.Save.NoSavedMajor);
		const results = await getSavedMajorsInfo(savedMajors, type);

		return generateSavedResponseMessage(type, results);
	} catch (error: unknown) {
		logMessage("ERROR", `handleGetSave error: \n${error instanceof Error ? error.message : error}`);
		return TextMessage(MessageContent.Error.default);
	}
};

const generateSavedResponseMessage = (type: string, results: (CacMajor | StarMajor | UacMajor)[]) => {
	if (results!.length > 11) {
		results = results!.slice(0, 11);
	}

	const isSaved = true;

	switch (type) {
		case "cac":
			return [ResultMessage(results as CacMajor[], isSaved)];
		case "star":
			return [StarResultMessage(results as StarMajor[], isSaved)];
		case "uac":
			return [UacResultMessage(results as UacMajor[], isSaved)];
		default:
			console.log("unexpected search mode: ", type);
			return TextMessage(MessageContent.Error.default);
	}
};

export default handleText;
