const qrService = require('../services/qrService');

const createQRGeneral = async (req, res) => {
  try {
    const { qrGeneralUUID, linkedQRs } = await qrService.createQRGeneral();
    res.status(201).json({ qrGeneralUUID, linkedQRs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const assignQRGeneralToUser = async (req, res) => {
  const { qrGeneralUUID, userUUID } = req.body;
  try {
    const updatedQRGeneral = await qrService.assignQRGeneralToUser(qrGeneralUUID, userUUID);
    res.json(updatedQRGeneral);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrUpdateQRLinkedData = async (req, res) => {
  const { qr_uuid, user_uuid, name, address, description } = req.body;
  try {
    const qrLinkedData = await qrService.createOrUpdateQRLinkedData(
      qr_uuid, user_uuid, { name, address, description }
    );
    res.status(200).json(qrLinkedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQRLinkedData = async (req, res) => {
  const { qr_uuid } = req.params;
  try {
    const qrLinkedData = await qrService.getQRLinkedData(qr_uuid);
    res.status(200).json(qrLinkedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validateQR = async (req, res) => {
  const { qr_uuid } = req.params;
  try {
    const validationResult = await qrService.validateQR(qr_uuid);
    res.status(200).json(validationResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listQRGeneralsByUser = async (req, res) => {
  const { userUUID } = req.params;
  try {
    const qrGenerals = await qrService.listQRGeneralsByUser(userUUID);
    res.status(200).json({ userUUID, qrGenerals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createQRGeneral,
  assignQRGeneralToUser,
  getQRLinkedData,
  createOrUpdateQRLinkedData,
  validateQR,
  listQRGeneralsByUser
};
