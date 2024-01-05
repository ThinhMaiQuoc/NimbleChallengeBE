import Queue from 'bull';
import { scrapeSearchResults } from '../services/scraper.service.js';
import searchResultService from '../services/searchResult.service.js';

const scrapingQueue = new Queue('scraping', `redis://${process.env.REDIS_HOST}}:6379`);

scrapingQueue.process(async (job) => {
    const { keyword_id, keyword, jobId } = job.data;
    const results = await scrapeSearchResults(keyword);

    await searchResultService.addSearchResult(keyword_id, {
        ...results,
        jobId: jobId
    });
});

export default scrapingQueue;
