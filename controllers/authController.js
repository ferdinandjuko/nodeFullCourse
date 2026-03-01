import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password required' });

    const foundUser = await User.findOne({ username: user }).exec();
    console.log(foundUser);
    if (!foundUser) return res.sendStatus(401); // Unauthorized

    // Evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    const isDev = process.env.NODE_ENV !== 'production';
    if (match) {
        const roles = Object.values(foundUser.roles);
        // Create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: isDev ? 'Lax' : 'None',
            secure: !isDev ? true : false,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } else {
        res.sendStatus(401); // Unauthorized
    }
}

export { handleLogin };