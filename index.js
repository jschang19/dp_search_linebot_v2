import { http } from '@google-cloud/functions-framework';
import { Client, validateSignature } from '@line/bot-sdk';
import handleEvent from './line/handleEvent.js';
import connectDB from './utils/database.js';

http('main', async (req, res) => {
	try {
		// validate signature
		if (!validateSignature(JSON.stringify(req.body), process.env.LINE_CHANNEL_SECRET, req.headers['x-line-signature'])) {
			res.status(400).send('Invalid Signature');
			return;
		}

		// connect to mongodb
		await connectDB();

		const line = new Client({
			channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
			channelSecret: process.env.LINE_CHANNEL_SECRET,
		});
		const events = req.body.events;
		const results = await Promise.all(events.map((event) => handleEvent(line, event)));
		res.status(200).send(results);
	} catch (err) {
		console.log(err);
		res.status(err.status || 500).send(err.message);
	}
});
