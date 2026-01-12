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

app.get(['/new-page', '/new-page.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get(['/old-page', '/old-page.html'], (req, res) => {
    res.redirect(301, '/new-page.html');
});

// Route handlers
app.get(['/hello', '/hello.html'],
    // Handler 1 — middleware-like
    (req, res, next) => {
        console.log('attempted to load hello.html');
        next();
    },
    // Handler 2 — send response
    (req, res) => {
        res.send('Hello Mate!');
    }
);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
