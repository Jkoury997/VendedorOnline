// controllers/userController.js
const { registerUser,loginUser,getClientIp } = require('../services/userService');
const { generateAccessToken, generateRefreshToken} = require('../services/tokenService');


const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser(email, password);
        const ip = getClientIp(req);
        const accessToken = generateAccessToken(user.id);
        const refreshToken = await generateRefreshToken(user.uuid, ip);

        res.status(200).json({ user, accessToken: `Bearer ${accessToken}`, refreshToken: `Bearer ${refreshToken}` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    register,
    login
};