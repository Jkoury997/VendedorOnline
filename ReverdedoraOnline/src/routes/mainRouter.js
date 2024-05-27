const express = require('express');
const {protect} = require("../middlewares/accessTokenMiddleware")
const router = express.Router();
const qrRoutes = require('./qrRoute');

//Ruta Qrs
router.use('/qrs',protect, qrRoutes);

module.exports = router;