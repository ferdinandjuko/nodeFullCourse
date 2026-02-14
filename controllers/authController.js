import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersDB = {
    users: JSON.parse(await fsPromises.readFile(path.join(__dirname, '..', 'model', 'users.json'))),
    setUsers: function (data) { this.users = data }
}

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password required' });

    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401); // Unauthorized

    // Evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        res.json({ 'success': `User ${user} is logged in` });
    } else {
        res.sendStatus(401); // Unauthorized
    }
}

export { handleLogin };