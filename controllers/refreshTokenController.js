import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersDB = {
    users: JSON.parse(await fsPromises.readFile(path.join(__dirname, '..', 'model', 'users.json'))),
    setUsers: function (data) { this.users = data }
}

const handleRefreshToken = (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookie.jwt;
}

export { handleRefreshToken };