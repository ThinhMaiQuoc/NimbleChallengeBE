
import db from '../configs/database.config.js';

const addSearchResult = async (keywordId, results) => {
    const { adWordsCount, links, searchInfo, htmlContent } = results;
    await db('search_results').insert({
        keyword_id: keywordId,
        adwords_count: adWordsCount,
        link_count: links.length,
        total_results: searchInfo,
        html_code: htmlContent
    });
}

export {
    addSearchResult
};
