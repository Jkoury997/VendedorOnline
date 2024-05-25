const mongoose = require('mongoose');

const UserMercadoPagoSchema = new mongoose.Schema({
  userUUID: {
    type: String,
    required: true,
    unique: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
}, { timestamps: true }); // Agrega timestamps para createdAt y updatedAt

module.exports = mongoose.model('UserMercadoPago', UserMercadoPagoSchema);
