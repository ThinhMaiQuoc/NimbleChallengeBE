import { processKeywordsUpload } from '../services/processKeywords.service.js';

const uploadKeywords = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        await processKeywordsUpload(req.file.path, req.user.userId);
        res.send('File uploaded and keywords stored.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing file.');
    }
};

export { uploadKeywords };
