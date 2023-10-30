import { http, Request, Response } from "@google-cloud/functions-framework";
import { Client, validateSignature } from "@line/bot-sdk";
import handleLineRequest from "@/handler/line";
import "dotenv/config";

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN!;
const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET!;

const line = new Client({
	channelAccessToken: LINE_CHANNEL_ACCESS_TOKEN,
	channelSecret: LINE_CHANNEL_SECRET,
});

const handleRequest = async (req: Request, res: Response): Promise<void> => {
	try {
		const param = req.originalUrl.split("/")[1];

		switch (param) {
			case "line": {
				const requestBody = req.body;
				if (
					!validateSignature(
						JSON.stringify(requestBody),
						LINE_CHANNEL_SECRET,
						req.headers["x-line-signature"] as string
					)
				) {
					res.status(401).send("Invalid Signature");
					return;
				}
				await handleLineRequest(line, req, res);
				return;
			}
			default:
				res.status(404).send("Not Found");
		}
	} catch (error: unknown) {
		console.log(
			JSON.stringify({
				severity: "ERROR",
				message: `Main handler error: \n${error instanceof Error ? error.message : error}`,
			})
		);
		res.status(500).send(error instanceof Error ? error.message : error);
	}
};

http("main", handleRequest);
