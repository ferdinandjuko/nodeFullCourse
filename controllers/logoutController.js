import path from 'path';
import { fileURLToPath } from 'url';
import User from '../model/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handleLogout = async (req, res) => {
    // On client, also delete the acessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(205); // No content
    const refreshToken = cookies.jwt;

    // Is refresh token in DB ?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204); // Success but No Content
    }
    const isDev = process.env.NODE_ENV !== 'production'
    // Delete refreshToken in db
    foundUser.refreshToken = '';
    await foundUser.save();

    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: isDev ? 'Lax' : 'None',
        secure: !isDev ? true : false
    }); // Secure: true - Only serves on https
    res.sendStatus(204);
}

export { handleLogout };