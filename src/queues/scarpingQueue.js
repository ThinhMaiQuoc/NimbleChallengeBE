import Queue from 'bull';
import { scrapeSearchResults } from '../services/scraper.service.js';
import searchResultService from '../services/searchResult.service.js';

const scrapingQueue = new Queue('scraping', 'redis://127.0.0.1:6379');

scrapingQueue.process(async (job) => {
    const { keyword_id, keyword } = job.data;
    const results = await scrapeSearchResults(keyword);
    await searchResultService.addSearchResult(keyword_id, results);
    return results;
});

export default scrapingQueue;
