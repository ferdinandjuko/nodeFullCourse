import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

import { logger } from './middleware/logEvents.js';
import errorHandler from './middleware/errorHandler.js';
import verifyJWT from './middleware/verifyJWT.js';

import corsOptions from './config/corsOptions.js';
import employeesRouter from './routes/api/employees.js';

import rootRouter from './routes/root.js';
import registerRouter from './routes/register.js';
import authRouter from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middlewate to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static file
app.use('/', express.static(path.join(__dirname, '/public')));

// routes handling
app.use('/', rootRouter);
app.use('/register', registerRouter);
app.use('/auth', authRouter);

app.use(verifyJWT); // Like waterfall, everything after this line wil use the verified jwt
app.use('/employees', employeesRouter);

app.use((req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 Not Found" })
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
