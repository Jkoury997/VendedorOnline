// src/controllers/paymentController.js
const paymentService = require('../services/paymentService');

const createPaymentLink = async (req, res) => {
  try {
    const { amount, userUUID, revendedorAmount } = req.body;
    const paymentLink = await paymentService.createPreference(amount, userUUID, revendedorAmount);
    res.status(200).json({ paymentLink });
  } catch (error) {
    console.error('Error en createPaymentLink:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPaymentLink
};
