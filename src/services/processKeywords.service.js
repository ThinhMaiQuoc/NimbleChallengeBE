import { parseCSV } from '../utils/parseCSV.util.js';
import keywordService from '../services/keyword.service.js';
import searchResultService from '../services/searchResult.service.js';
import { scrapeSearchResults } from './scraper.service.js';
import scrapingQueue from '../queues/scarpingQueue.js';

const processKeywordsUpload = async (filePath, userId) => {
    const keywordsArray = await parseCSV(filePath);
    const uniqueKeywords = [...new Set(keywordsArray)];

    const existingKeywords = await keywordService.findExistingKeywords(uniqueKeywords, userId);
    const newKeywords = uniqueKeywords.filter(kw => !existingKeywords.includes(kw));

    let keywordsToProcess = [];

    if (newKeywords.length > 0) {
        await keywordService.insertNewKeywords(newKeywords, userId);
        keywordsToProcess = await keywordService.getInsertedKeywords(newKeywords, userId);
    }

    for (const keywordObj of keywordsToProcess) {
        const { keyword_id, keyword } = keywordObj;
        await scrapingQueue.add({ keyword_id, keyword });
    }
};

export {
    processKeywordsUpload
};
