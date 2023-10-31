import { QuickReplyItem, TextMessage } from "@line/bot-sdk";

export function TextMessage(text: string): TextMessage {
	if (!text) throw new Error("text is empty");
	else if (text.length > 2000) throw new Error("text is too long");

	return {
		type: "text",
		text,
	};
}

export function QuickReplyComponent(label: string, text: string): QuickReplyItem {
	if (!label || !text) throw new Error("label or text is empty");
	return {
		type: "action",
		action: {
			type: "message",
			label,
			text,
		},
	};
}

export function QuickReplyMessage(text: string, quickReplyItems: QuickReplyItem[]): TextMessage {
	if (!text) throw new Error("text is empty");
	else if (text.length > 2000) throw new Error("text is too long");
	else if (quickReplyItems.length > 10) throw new Error("quickReplyItems is too long");

	return {
		type: "text",
		text,
		quickReply: {
			items: quickReplyItems,
		},
	};
}
