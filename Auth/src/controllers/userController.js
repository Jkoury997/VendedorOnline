// controllers/userController.js
const { registerUser,loginUser,getClientIp,logoutUser } = require('../services/userService');
const { generateAccessToken, generateRefreshToken,revokeTokens} = require('../services/tokenService');


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
        const accessToken = generateAccessToken(user._id,user.uuid);
        const refreshToken = await generateRefreshToken(user.uuid, ip);

        res.status(200).json({ user, accessToken:accessToken, refreshToken:refreshToken});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const logout = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        await logoutUser(refreshToken);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error });
    }
};

const revokeAllTokens = async (req, res) => {
    const { userUuid } = req.body;

    if (!userUuid) {
        return res.status(400).json({ message: 'User UUID is required' });
    }

    try {
        await revokeTokens(userUuid);
        res.status(200).json({ message: 'All tokens revoked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error revoking tokens', error });
    }
};

module.exports = {
    register,
    login,
    logout,
    revokeAllTokens
};