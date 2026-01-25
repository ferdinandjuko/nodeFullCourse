import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';

import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'dd-MM-yyy\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        // Testing
        await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem);
    } catch (err) {
        console.error(err);
    }
}

// exit on uncaught errors
process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err);
    process.exit(1);
});

export default logEvents;