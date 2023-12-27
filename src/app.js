import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import authRouter from './routes/auth.route.js';
import { logger } from './middlewares/logger.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

dotenv.config();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use(bodyParser.json());

app.use(cors());
app.use(logger);
app.use(limiter);

app.use('/api/auth', authRouter);

app.use('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
