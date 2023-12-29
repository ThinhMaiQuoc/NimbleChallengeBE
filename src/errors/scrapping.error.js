export class ScrapingError extends Error {
    constructor(message) {
        super(message);
        this.name = "ScrapingError";
    }
}