const mongoose = require('mongoose');

const QRGeneralSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  user_uuid: { type: String, default: null },  // Se asignará cuando el usuario escanee el QR
  linked_qrs: [{ type: String }],  // Lista de UUIDs de los QR vinculados
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

const QRGeneral = mongoose.model('QRGeneral', QRGeneralSchema);
module.exports = QRGeneral;