// models/keyword.model.js

import db from '../configs/database.config.js';

const addKeyword = async (userId, keyword) => {
    const exists = await db('keywords')
        .where({ user_id: userId, keyword: keyword })
        .first();

    if (exists) {
        throw new Error('Keyword already exists for this user.');
    }

    return db('keywords').insert({
        user_id: userId,
        keyword: keyword
    });
};

export {
    addKeyword
};
