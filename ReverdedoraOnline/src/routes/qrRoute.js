const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');

// Ruta para crear un nuevo QR general
router.post('/qr-general/create', qrController.createQRGeneral);

// Ruta para asignar un QR general a un usuario
router.post('/qr-general/assign', qrController.assignQRGeneralToUser);

// Ruta para crear o actualizar los datos del QR hijo
router.post('/qr-linked-data', qrController.createOrUpdateQRLinkedData);

// Ruta para obtener los datos del QR hijo
router.get('/qr-linked-data/:qr_uuid', qrController.getQRLinkedData);

router.get('/validate-qr/:qr_uuid', qrController.validateQR);

// Ruta para obtener la lista de QR generales vinculados a un usuario
router.get('/qr-general/list/:userUUID', qrController.listQRGeneralsByUser);




module.exports = router;