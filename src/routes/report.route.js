import express from 'express';
import { getKeywordReport } from '../controllers/report.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const reportRouter = express.Router();

reportRouter.get('/report', authenticate, getKeywordReport);

export default reportRouter;
