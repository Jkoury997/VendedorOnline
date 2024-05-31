const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserMercadoPagoSchema = new Schema({
  userUUID: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  tokenType: { type: String },
  expiresIn: { type: Number },
  scope: { type: String },
  userId: { type: Number },
  publicKey: { type: String },
  liveMode: { type: Boolean },
}, { timestamps: true });

module.exports = mongoose.model('UserMercadoPago', UserMercadoPagoSchema);
