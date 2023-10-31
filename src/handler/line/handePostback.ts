import { PostbackEvent, Message } from "@line/bot-sdk";
import { TextMessage, QuickReplyComponent, QuickReplyMessage } from "@/utils/line/message";
import { addSave, unSave, checkExceedLimit, checkHasSaved } from "@utils/user/saves";
import { updatePreferenceMode } from "@utils/user/preference";
import logMessage from "@utils/log";
import { MessageContent } from "@/config";

const handlePostback = async (event: PostbackEvent): Promise<Message | Message[] | null> => {
	const userPostback = event.postback.data;
	const userId = event.source.userId!;

	const task = userPostback.split("-")[0];
	switch (task) {
		case "save":
			return await handleAddSave(userId, userPostback);
		case "unsave":
			return await handleUnsave(userId, userPostback);
		case "switch":
			return await handleSwitchMenu(userId, userPostback);
		default:
			console.log("unexpected postback task: ", task);
			return null;
	}
};

const handleAddSave = async (userId: string, userPostback: string) => {
	try {
		if (!userId) throw new Error("userId is undefined in handleSave");

		const [, type, university, majorId] = userPostback.split("-");
		const [exceedLimit, hasSaved] = await Promise.all([checkExceedLimit(userId), checkHasSaved(userId, majorId)]);

		if (exceedLimit) {
			const quickItem = QuickReplyComponent("查看收藏", "收藏");
			return QuickReplyMessage(MessageContent.Save.ExceedLimit, [quickItem]);
		}

		if (hasSaved) {
			const quickItem = QuickReplyComponent("查看收藏", "收藏");
			return QuickReplyMessage(MessageContent.Save.AlreadySaved, [quickItem]);
		}

		await addSave(userId, {
			majorId,
			universityId: university,
			type,
		});
		return TextMessage(MessageContent.Save.Success);
	} catch (error: unknown) {
		logMessage("ERROR", `handle save error: ${error}`);
		return TextMessage(MessageContent.Error.save);
	}
};

const handleUnsave = async (userId: string, userPostback: string) => {
	const [, type, university, majorId] = userPostback.split("-");

	const hasSaved = await checkHasSaved(userId, majorId);

	if (!hasSaved) return TextMessage(MessageContent.Save.HaventSaved);

	await unSave(userId, {
		majorId,
		universityId: university,
		type,
	});

	return TextMessage(MessageContent.Save.Removed);
};

const handleSwitchMenu = async (userId: string, userPostback: string) => {
	try {
		const [, modeCode] = userPostback.split("-");

		let mode: string = "";

		switch (modeCode) {
			case "1":
				mode = "cac";
				break;
			case "2":
				mode = "star";
				break;
			case "3":
				mode = "uac";
				break;
			default:
				console.log("unexpected mode code: ", modeCode);
				mode = "cac";
				break;
		}

		await updatePreferenceMode(userId, mode);
		return TextMessage("已切換搜尋模式");
	} catch (error: unknown) {
		logMessage("ERROR", `handle switch menu error: ${error}`);
		return TextMessage("切換搜尋模式時發生了一些問題，請稍後再試～");
	}
};

export default handlePostback;
