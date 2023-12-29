import puppeteer from 'puppeteer';
import { getRandomDelay } from '../utils/timer.util.js';

const scrapeSearchResults = async (keyword) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto('https://www.google.com', { waitUntil: 'networkidle2' });

        const searchSelector = 'textarea[name="q"]';
        await page.waitForSelector(searchSelector);
        await page.click(searchSelector);
        await page.type(searchSelector, keyword);
        await page.keyboard.press('Enter');

        await page.waitForSelector('div#search');

        await page.waitForTimeout(getRandomDelay());

        const searchResults = await page.evaluate(() => {
            let adWordsCount = document.querySelectorAll('.ads-ad').length;
            let links = [...document.querySelectorAll('.tF2Cxc .yuRUbf a')].map(el => el.href);
            let searchInfo = document.querySelector('#result-stats')?.innerText;
            let htmlContent = document.querySelector('html')?.outerHTML;

            return {
                adWordsCount,
                links,
                searchInfo,
                htmlContent
            };
        });

        await browser.close();
        return searchResults;
    } catch (error) {
        throw new ScrapingError(`Error scraping data for keyword ${keyword}: ${error.message}`);
    }
};

export { scrapeSearchResults };
