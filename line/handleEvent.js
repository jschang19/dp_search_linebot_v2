import handleText from './handleText.js';
import User from '../models/user.js';

const handleEvent = async (line, event) => {
	if (event.type === 'message' && event.message.type === 'text') {
		const replyMessage = await handleText(event);
		return line.replyMessage(event.replyToken, replyMessage);
	} else if (event.type === 'postback' && event.postback.data) {
		// create a echoing text message for postback event
		// just for temporary use
		const echo = { type: 'text', text: 'wow a postback' };

		// use reply API
		return line.replyMessage(event.replyToken, echo);
	}
	// follow event
	else if (event.type === 'follow') {
		const userId = event.source.userId;
		// get user profile
		const profile = await line.getProfile(userId);
		// create a user
		const user = await User.create({
			lineId: userId,
			userName: profile.displayName,
		});
		return line.replyMessage(event.replyToken, { type: 'text', text: `Hello ${profile.displayName}!` });
	} else {
		// ignore non-text-message event
		return Promise.resolve(null);
	}
};

export default handleEvent;
