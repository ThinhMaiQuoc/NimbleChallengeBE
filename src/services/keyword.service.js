import db from '../configs/database.config.js';
import { DatabaseError } from '../errors/database.error.js';
class KeywordService {
    async findExistingKeywords(uniqueKeywords, userId) {
        try {
            return await db('keywords')
                .whereIn('keyword', uniqueKeywords)
                .andWhere('user_id', userId)
                .select('keyword_id', 'keyword');
        } catch (error) {
            throw new DatabaseError(`Failed find keyword: ${error.message}`);
        }
    }

    async insertNewKeywords(newKeywords, userId) {
        try {
            const keywordsToInsert = newKeywords.map(keyword => ({ user_id: userId, keyword }));
            await db('keywords').insert(keywordsToInsert);
        } catch (error) {
            throw new DatabaseError(`Failed to save keyword: ${error.message}`);
        }
    }

    async getInsertedKeywords(newKeywords, userId) {
        try {
            return await db('keywords')
                .whereIn('keyword', newKeywords)
                .andWhere('user_id', userId)
                .select('keyword_id', 'keyword');
        } catch (error) {
            throw new DatabaseError(`Failed to retrieve keyword: ${error.message}`);
        }
    }
}

export default new KeywordService();
