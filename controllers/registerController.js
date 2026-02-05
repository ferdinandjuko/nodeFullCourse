import fsPromises from 'fs/promises';
import { fileUrlToPath } from 'url'
import path from 'path';

const __filename = fileUrlToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersDB = {
    users: JSON.parse(await fsPromises.readFile(path.join(__dirname, '..', 'model', 'users.json'))),
    setUser: function (data) { this.users = data }
}