
import { ScrapingError } from '../errors/scrapping.error.js';
import { DatabaseError } from '../errors/database.error.js';

const errorMiddleware = (error, req, res, next) => {
    console.error(error);

    if (error instanceof ScrapingError) {
        res.status(500).send("Error during scraping.");
    } else if (error instanceof DatabaseError) {
        res.status(500).send("Database operation failed.");
    } else {
        res.status(500).send("Internal server error.");
    }
};

export {
    errorMiddleware
};
