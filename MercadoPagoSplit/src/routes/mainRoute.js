
const {protect} = require("../middlewares/accessTokenMiddleware")
const express = require('express');
const router = express.Router();

const mercadoPagoRoute = require('./mercadoPagoRoute');
const paymentRoute = require('./paymentRoute');


router.use('/mercadopago', mercadoPagoRoute);
router.use("/payments",paymentRoute)


router.get("/", (req, res) => {
    res.json("Funciona");
  });


module.exports = router;