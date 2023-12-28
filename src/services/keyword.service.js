import { parseCSV } from '../utils/parseCSV.util.js';
import { addKeyword } from '../models/keyword.model.js';
import db from '../configs/database.config.js';

const processKeywordsUpload = async (filePath, userId) => {
    const keywordsArray = await parseCSV(filePath);
    const keywords = [...new Set(keywordsArray)].map(keyword => ({
        user_id: userId,
        keyword: keyword
    }));

    await db.transaction(async trx => {
        for (const keyword of keywords) {
            const exists = await trx('keywords')
                .where({ user_id: userId, keyword: keyword.keyword })
                .first();

            if (!exists) {
                await trx('keywords').insert(keyword);
            }
        }
    });
};

export { processKeywordsUpload };
