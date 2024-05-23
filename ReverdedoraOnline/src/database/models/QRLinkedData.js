const mongoose = require('mongoose');

const QRLinkedDataSchema = new mongoose.Schema({
  qr_uuid: { type: String, required: true, unique: true },
  name: { type: String, default: null },
  address: { type: String, default: null },
  description: { type: String, default: null },
  user_uuid: { type: String, required: true }
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

const QRLinkedData = mongoose.model('QRLinkedData', QRLinkedDataSchema);
module.exports = QRLinkedData;