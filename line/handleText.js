import {TextMessage} from '../models/messages.js'
import { searchInfo, parseSearchTerms } from '../utils/search.js';
import { ResultMessage } from '../models/messages.js';
const handleText = async (event) => {
    try{
        const userMessage = event.message.text;
        const userId = event.source.userId;
    if(userMessage === 'hi'){
        const reply = TextMessage('hi there');
        return reply;
    }
    const parsedTerms = await parseSearchTerms(userMessage);
    const results = await searchInfo(parsedTerms);
    if(results.error === 1) return TextMessage('沒有這間學校的資料');
    else if(results.error === 2) return TextMessage('沒有這個系所的資料');
    return ResultMessage(results.university, results.data);
    }
    catch(error){
        new Error(error);
        return TextMessage(`mes:\n${error}`);
    }
}

export default handleText;