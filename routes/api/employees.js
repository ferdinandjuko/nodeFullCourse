import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();
const data = {};

data.employees = JSON.parse(await fsPromises.readFile(path.join(__dirname, '..', '..', 'data', 'employees.json')));

router.route('/')
    .get()
    .post()
    .put()
    .delete((req, res) => {
        res.json({ "id": req.body.id })
    });

router.route('/:id')
    .get((req, res) => {
        res.json({ "id": req.params.id })
    });
export default router;