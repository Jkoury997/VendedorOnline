// routes/userRoutes.js
const express = require('express');
const { register,login } = require('../controllers/userController');
const { validateRegister, validateLogin } = require('../validators/userValidator');

const router = express.Router();


router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
module.exports = router;