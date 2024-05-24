// routes/userRoutes.js

const authRoute = require("./authRoute")
const recoveryRoute = require("./recoveryRoute")
const tokenRoute = require("./tokenRoute")
const express = require("express")

const router = express.Router();

router.use('/auth', authRoute);
router.use('/recovery', recoveryRoute);
router.use('/token', tokenRoute);

module.exports = router