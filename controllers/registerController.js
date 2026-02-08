import fsPromises from 'fs/promises';
import { fileUrlToPath } from 'url'
import path from 'path';
import bcrypt from 'bcrypt';

const __filename = fileUrlToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersDB = {
    users: JSON.parse(await fsPromises.readFile(path.join(__dirname, '..', 'model', 'users.json'))),
    setUser: function (data) { this.users = data }
}

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are erquired' });
    // check for duplicate username in the db
    const duplicate = usersDB.find(user => user.username === user);
    if (duplicate) return res.sendStatus(409); // Conflict
    try {
        // encrypt the password
        const hashePwd = await bcrypt.hash(pwd, 10);
        // store the new user
        const newUser = { "username": user, "password": hashePwd };
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        console.log(usersDB.users);
        res.status(201).json({ 'success': `New user ${user} created` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

export default handleNewUser;