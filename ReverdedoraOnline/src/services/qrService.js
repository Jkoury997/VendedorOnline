const QRGeneral = require('../database/models/QRGeneral');
const QRLinked = require('../database/models/QRLinked');
const QRLinkedData = require('../database/models/QRLinkedData');
const { v4: uuidv4 } = require('uuid'); // Asegúrate de tener 'uuid' instalado


//Crea el qr general y sus hijos
const createQRGeneral = async () => {
  try {
    const qrGeneralUUID = uuidv4(); // Generar UUID único
    const linkedQRs = [];

    // Generar 100 UUIDs para los QR vinculados
    for (let i = 0; i < 100; i++) {
      const qrUUID = uuidv4();
      linkedQRs.push(qrUUID);

      // Guardar cada QR vinculado en la base de datos
      const newQRLinked = new QRLinked({ qr_general_uuid: qrGeneralUUID, qr_uuid: qrUUID });
      await newQRLinked.save();
    }

    // Crear y guardar el QR general con los QR vinculados
    const newQRGeneral = new QRGeneral({ uuid: qrGeneralUUID, linked_qrs: linkedQRs });
    await newQRGeneral.save();

    // Devolver el QR general y sus QR vinculados
    return {
      qrGeneralUUID,
      linkedQRs
    };
  } catch (error) {
    console.error('Error al crear el QR general:', error);
    throw new Error('Error al crear el QR general');
  }
};
// Asinna el qr genral a un usuario
const assignQRGeneralToUser = async (qrGeneralUUID, userUUID) => {
  try {
    const qrGeneral = await QRGeneral.findOne({ uuid: qrGeneralUUID });

    if (!qrGeneral) {
      throw new Error('QR general no encontrado');
    }

    if (qrGeneral.user_uuid) {
      throw new Error('El QR general ya está asignado a otro usuario');
    }

    qrGeneral.user_uuid = userUUID;
    await qrGeneral.save();

    return qrGeneral;
  } catch (error) {
    console.error('Error al asignar el QR general al usuario:', error);
    throw new Error('Error al asignar el QR general al usuario');
  }
};

//
const createOrUpdateQRLinkedData = async (qr_uuid, user_uuid, data) => {
  try {
    // Verificar si el QR ya tiene datos asignados
    let qrLinkedData = await QRLinkedData.findOne({ qr_uuid });

    if (qrLinkedData) {
      // Verificar que el usuario es el propietario de los datos
      if (qrLinkedData.user_uuid !== user_uuid) {
        throw new Error('No tienes permiso para modificar estos datos');
      }

      // Actualizar los datos existentes
      qrLinkedData.name = data.name || qrLinkedData.name;
      qrLinkedData.address = data.address || qrLinkedData.address;
      qrLinkedData.description = data.description || qrLinkedData.description;
    } else {
      // Crear nuevos datos
      qrLinkedData = new QRLinkedData({
        qr_uuid,
        user_uuid,
        name: data.name,
        address: data.address,
        description: data.description
      });
    }

    await qrLinkedData.save();
    return qrLinkedData;
  } catch (error) {
    console.error('Error al crear o actualizar los datos del QR hijo:', error);
    throw new Error('Error al crear o actualizar los datos del QR hijo');
  }
};

//Obtine los datos del qr hijo
const getQRLinkedData = async (qr_uuid) => {
  try {
    const qrLinkedData = await QRLinkedData.findOne({ qr_uuid });

    if (!qrLinkedData) {
      const qrLinked = await QRLinked.findOne({ qr_uuid });
      if (qrLinked) {
        return { message: 'No posee datos' };
      } else {
        throw new Error('QR hijo no encontrado');
      }
    }
    return qrLinkedData;
  } catch (error) {
    console.error('Error al obtener los datos del QR hijo:', error);
    throw new Error(error.message);
  }
};

const validateQR = async (qr_uuid) => {
  try {
    // Verificar si el QR es un QR general
    const qrGeneral = await QRGeneral.findOne({ uuid: qr_uuid });
    if (qrGeneral) {
      const userAssigned = qrGeneral.user_uuid ? true : false;
      return { isValid: true, type: 'general', qr_uuid: qr_uuid, userAssigned };
    }

    // Verificar si el QR es un QR hijo
    const qrLinked = await QRLinked.findOne({ qr_uuid: qr_uuid });
    if (qrLinked) {
      const qrGeneral = await QRGeneral.findOne({ uuid: qrLinked.qr_general_uuid });
      if (qrGeneral) {
        const userAssigned = qrGeneral.user_uuid ? true : false;
        return {
          isValid: true,
          type: 'linked',
          qr_uuid: qr_uuid,
          qr_general_uuid: qrGeneral.uuid,
          userAssigned
        };
      }
    }

    // Si no se encuentra en ninguna de las colecciones
    return { isValid: false, qr_uuid: qr_uuid, message: 'QR no válido' };
  } catch (error) {
    console.error('Error al validar el QR:', error);
    throw new Error('Error al validar el QR');
  }
};


module.exports = {
  createQRGeneral,
  assignQRGeneralToUser,
  createOrUpdateQRLinkedData,
  getQRLinkedData,
  validateQR
};