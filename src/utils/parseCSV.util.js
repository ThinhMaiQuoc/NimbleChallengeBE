import fs from 'fs';
import readline from 'readline';

const parseCSV = async (filePath) => {
    const fileStream = fs.createReadStream(filePath);
    const lines = [];

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        lines.push(line);
    }

    return lines;
};

export {
    parseCSV
};
