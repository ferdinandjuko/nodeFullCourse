import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handleRefreshToken = async (req, res) => {

    const cookie = req.cookies;
    if (!cookie?.jwt) return res.sendStatus(403); // Forbidden
    const refreshToken = cookie.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); // Forbidden

    // Evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403); // Invalid refreshToken
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken });
        }
    );
}

export { handleRefreshToken };