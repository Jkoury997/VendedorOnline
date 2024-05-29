// src/controllers/paymentController.js
const paymentService = require('../services/paymentService');

const createPaymentLink = async (req, res) => {
  try {
    const idempotencyKey = req.headers["X-Idempotency-Key"];
    const { amount, userUUID, revendedorAmount } = req.body;
    const paymentLink = await paymentService.createPreference(amount, userUUID, revendedorAmount,idempotencyKey);
    res.status(200).json({ paymentLink });
  } catch (error) {
    console.error('Error en createPaymentLink:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPaymentLink
};
