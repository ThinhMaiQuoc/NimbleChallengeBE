import searchResultService from '../services/searchResult.service.js';

const getKeywordReport = async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).send('No keyword provided.');
    }

    try {
        const results = await searchResultService.searchReports(query);
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing file.');
    }
};

export {
    getKeywordReport
};
