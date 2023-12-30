import { processKeywordsUpload } from '../services/processKeywords.service.js';
import searchResultService from '../services/searchResult.service.js';

const uploadKeywords = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const jobResults = await processKeywordsUpload(req.file.path, req.user.userId);
        res.status(200).json(jobResults);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing file.');
    }
};

const fetchResultsForKeywords = async (req, res) => {
    const jobIds = req.query.jobIds ? req.query.jobIds.split(',') : [];
    try {
        const results = await searchResultService.getResultsForKeywords(jobIds);
        res.json(results);
    } catch (error) {
        console.error('Error fetching results for job IDs:', error);
        res.status(500).send('Internal server error');
    }
};

export { 
    uploadKeywords,
    fetchResultsForKeywords
};
