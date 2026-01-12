import express from 'express';
import path from 'path';
import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';

import logEvents from './logEvents.js';

import { EventEmitter } from 'events';

const app = express();
const PORT = process.env.PORT || 3500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get(['/', '/index.html', '/index'], (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
