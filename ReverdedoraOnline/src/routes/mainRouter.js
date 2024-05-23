const express = require('express');
const router = express.Router();
const qrRoutes = require('./qrRoute');

//Ruta Qrs
router.use('/qrs', qrRoutes);

module.exports = router;