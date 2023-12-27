import db from '../configs/database.config.js';
import bcrypt from 'bcrypt';

const createUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return db('users').insert({
        username,
        email,
        password_hash: hashedPassword
    });
};

const findUserByEmail = async (email) => {
    return db('users').where('email', email).first();
};

const validatePassword = async (email, password) => {
    const user = await findUserByEmail(email);
    return user && await bcrypt.compare(password, user.password_hash);
};

export {
    createUser,
    findUserByEmail,
    validatePassword
};
