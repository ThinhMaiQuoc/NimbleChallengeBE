import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadKeywords, fetchResultsForKeywords } from '../controllers/keyword.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const keywordRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

keywordRouter.post('/upload', authenticate, upload.single('file'), uploadKeywords);
keywordRouter.get('/results', authenticate, fetchResultsForKeywords);

export default keywordRouter;
