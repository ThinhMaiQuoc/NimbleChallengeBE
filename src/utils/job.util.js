export const generateJobId = (keywordId) => {
    return `${keywordId}-${Date.now()}`;
};