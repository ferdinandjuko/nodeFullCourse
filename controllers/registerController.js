import { fileURLToPath } from 'url'
import path from 'path';
import bcrypt from 'bcrypt';
import User from '../model/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are erquired' });
    // check for duplicate username in the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); // Conflict
    try {
        // encrypt the password
        const hashePwd = await bcrypt.hash(pwd, 10);
        // create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashePwd
        });
        console.log(result);
        res.status(201).json({ 'success': `New user ${user} created` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

// registerController.js exports:
export { handleNewUser }  // ← 'handler' without 'r' at the end