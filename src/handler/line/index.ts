import handleText from "./handleText";
import { Client, WebhookEvent } from "@line/bot-sdk";
import { Request, Response } from "@google-cloud/functions-framework";

const handleEvent = async (line: Client, event: WebhookEvent) => {
	if (event.type === "message" && event.message.type === "text") {
		const replyMessage = await handleText(event);

		if (!replyMessage) return Promise.resolve(null);
		return line.replyMessage(event.replyToken, replyMessage);
	} else if (event.type === "postback" && event.postback.data) {
		// create a echoing text message for postback event
		// just for temporary use

		// const reply = await handlePostback(event);
		// if (!reply) return Promise.resolve(null);
		// return line.replyMessage(event.replyToken, reply);

		return Promise.resolve(null);
	}
	// follow event
	else if (event.type === "follow") {
		// Use the setting in manager console instead
		// currently, we don't handle follow event on Cloud Function
		//const reply = await handleFollow(line, event);
		return Promise.resolve(null);
	} else {
		// ignore non-text-message event
		return Promise.resolve(null);
	}
};

const handleLineRequest = async (line: Client, req: Request, res: Response): Promise<void> => {
	try {
		const requestBody = req.body;
		const events: WebhookEvent[] = requestBody.events;
		await Promise.all(events.map((event) => handleEvent(line, event)));
		res.status(200).send("OK");
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.error(err.message);
			res.status(500).send(err.message);
		} else {
			console.error(err);
			res.status(500).send("Internal Server Error");
		}
	}
};

export default handleLineRequest;
