const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/auth-url/:useruuid', authController.authUrl);
router.get("/callback",authController.callback)

router.post('/renew-token', authController.renewToken);

module.exports = router;