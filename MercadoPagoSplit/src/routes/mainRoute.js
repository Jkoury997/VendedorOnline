const express = require('express');
const router = express.Router();
//const paymentRoute = require('./paymentRoute');
const mercadoPagoRoute = require('./mercadoPagoRoute');

router.use('/mercadopago', mercadoPagoRoute);
//router.use('/payment', paymentRoute);

module.exports = router;