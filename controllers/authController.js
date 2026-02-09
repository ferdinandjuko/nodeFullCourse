import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersDB = {
    users: await JOSN.parse(fsPromises.readFile(path.join(__dirname, '..', 'model', 'users.json'))),
    setUsers: function (data) { this.users = data }
}