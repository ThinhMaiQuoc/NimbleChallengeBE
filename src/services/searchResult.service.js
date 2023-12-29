import db from '../configs/database.config.js';

class SearchResultService {
    async addSearchResult(keywordId, results) {
        try {
            const { adWordsCount, links, searchInfo, htmlContent } = results;
            await db('search_results').insert({
                keyword_id: keywordId,
                adwords_count: adWordsCount,
                link_count: links.length,
                total_results: searchInfo,
                html_code: htmlContent
            });
        } catch (error) {
            throw new DatabaseError(`Failed add search result: ${error.message}`);
        }
    }
}

export default new SearchResultService();
