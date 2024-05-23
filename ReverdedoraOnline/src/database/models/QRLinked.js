const mongoose = require('mongoose');

const QRLinkedSchema = new mongoose.Schema({
  qr_general_uuid: { type: String, required: true },
  qr_uuid: { type: String, required: true, unique: true }
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

const QRLinked = mongoose.model('QRLinked', QRLinkedSchema);
module.exports = QRLinked;