import { parseCSV } from '../utils/parseCSV.util.js';
import keywordService from '../services/keyword.service.js';
import scrapingQueue from '../queues/scarpingQueue.js';
import { generateJobId } from '../utils/job.util.js';

const processKeywordsUpload = async (filePath, userId) => {
    const keywordsArray = await parseCSV(filePath);
    const uniqueKeywords = [...new Set(keywordsArray)];

    const existingKeywords = await keywordService.findExistingKeywords(uniqueKeywords, userId);
    const existingKeywordStrings = existingKeywords.map(kw => kw.keyword);

    const newKeywords = uniqueKeywords.filter(kw => !existingKeywordStrings.includes(kw));

    if (newKeywords.length > 0) {
        await keywordService.insertNewKeywords(newKeywords, userId);
    }

    const keywordsToProcess = await keywordService.findExistingKeywords(uniqueKeywords, userId);

    let jobResults = [];
    for (const keywordObj of keywordsToProcess) {
        const { keyword_id, keyword } = keywordObj;
        const jobId = generateJobId(keyword_id);

        await scrapingQueue.add({ keyword_id, keyword, jobId });
        jobResults.push({
            keyword_id,
            keyword,
            jobId: jobId
        });
    }

    // clearQueue().then(() => {
    //     console.log('Queue cleared');
    // });

    return jobResults;
};

async function clearQueue() {
    await scrapingQueue.empty();
}



export {
    processKeywordsUpload
};
