const express = require('express');
const router = express.Router();
//const paymentRoute = require('./paymentRoute');
const authRoute = require('./authRoute');

router.use('/auth', authRoute);
//router.use('/payment', paymentRoute);

module.exports = router;