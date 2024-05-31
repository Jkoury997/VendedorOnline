const { callback,verifyUserCreation,renewToken } = require('../controllers/mercadopagoController');

// routes/mercadoPagoRoute.js
const express = require('express');


const router = express.Router();


router.get('/user/callback',callback);
router.get('/user/verify', verifyUserCreation);
router.get('/user/renewToken',renewToken) ;


module.exports = router;