// services/userService.js
const User = require('../database/models/User');
const Token = require('../database/models/Token');
const bcrypt = require("bcryptjs")

const MAX_FAILED_ATTEMPTS = 3;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutos

const registerUser = async (userData) => {
    const { firstName, lastName, dni, email, password } = userData;

    // Verificar si el email o el DNI ya existen
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
        throw new Error('User with this email already exists');
    }

    const existingUserByDni = await User.findOne({ dni });
    if (existingUserByDni) {
        throw new Error('User with this DNI already exists');
    }

    // Crear un nuevo usuario
    const user = new User({ firstName, lastName, dni, email, password });
    await user.save();
    return user;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    if (user.lockUntil && user.lockUntil > Date.now()) {
        throw new Error(`Account is locked until ${user.lockUntil}`);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        user.failedLoginAttempts += 1;
        if (user.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
            user.lockUntil = Date.now() + LOCK_TIME;
            user.failedLoginAttempts = 0;
        }
        await user.save();
        throw new Error('Invalid password');
    }

    user.failedLoginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    // Eliminar la contraseña del objeto usuario antes de devolverlo
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return userWithoutPassword;
};

const getClientIp = (req) => {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (xForwardedFor) {
        return xForwardedFor.split(',')[0];
    } else if (req.connection && req.connection.remoteAddress) {
        return req.connection.remoteAddress;
    } else if (req.socket && req.socket.remoteAddress) {
        return req.socket.remoteAddress;
    } else if (req.connection && req.connection.socket && req.connection.socket.remoteAddress) {
        return req.connection.socket.remoteAddress;
    } else {
        return 'sin IP'; // Valor predeterminado si no se encuentra ninguna IP
    }
};

const logoutUser = async (refreshToken) => {
    await Token.deleteOne({ token: refreshToken });
};

module.exports = {
    registerUser,
    loginUser,
    getClientIp,
    logoutUser
};
