
const {protect} = require("../middlewares/accessTokenMiddleware")
const express = require('express');
const router = express.Router();

const mercadoPagoRoute = require('./mercadoPagoRoute');

router.use('/mercadopago',protect, mercadoPagoRoute);
router.get("/", (req, res) => {
    res.json("Funciona");
  });


module.exports = router;