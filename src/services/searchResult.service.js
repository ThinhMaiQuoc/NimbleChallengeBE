import db from '../configs/database.config.js';
import { DatabaseError } from '../errors/database.error.js';

class SearchResultService {
    async addSearchResult(keywordId, results) {
        try {
            const { adWordsCount, links, searchInfo, htmlContent, jobId } = results;
            await db('search_results').insert({
                keyword_id: keywordId,
                job_id: jobId,
                adwords_count: adWordsCount,
                link_count: links.length,
                total_results: searchInfo,
                html_code: htmlContent
            });
        } catch (error) {
            throw new DatabaseError(`Failed add search result: ${error.message}`);
        }
    }

    async getResultsForExistingKeywords(keywordIds) {
        try {
            const results = await db('search_results')
                .whereIn('keyword_id', keywordIds)
                .select('keyword_id', 'adwords_count', 'link_count', 'total_results', 'html_code');

            return results;
        } catch (error) {
            throw new DatabaseError(`Failed to retrieve search results: ${error.message}`);
        }
    }

    async getResultsForKeywords(jobIds) {
        try {
            const results = await db('search_results')
                .join('keywords', 'search_results.keyword_id', '=', 'keywords.keyword_id')
                .whereIn('search_results.job_id', jobIds)
                .select('search_results.*', 'keywords.keyword');

            return results;
        } catch (error) {
            throw new DatabaseError(`Failed to retrieve search results: ${error.message}`);
        }
    }
}

export default new SearchResultService();
