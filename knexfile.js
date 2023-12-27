import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const knexConfig = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
    },
    migrations: {
        directory: path.resolve('src', 'migrations'),
        loadExtensions: ['.js']
    },
    pool: { min: 0, max: 7 }
};

export default knexConfig;
