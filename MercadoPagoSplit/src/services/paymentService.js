// src/services/paymentService.js
const { MercadoPagoConfig,Preference,OAuth } = require('mercadopago');
const authService = require("./authService")


const UserMercadoPago = require('../database/models/UserMercadoPago');

const createPreference = async (amount, userUUID, revendedorAmount) => {

    let revendedor = await UserMercadoPago.findOne({ userUUID });


    const revendedorRefresh = await authService.renewAccessToken(revendedor.refreshToken)



    try {
    const client = new MercadoPagoConfig({ accessToken: revendedorRefresh.access_token});

    const preference = new Preference(client);




    const preferenceData = {
        body: {
          items: [
            {
                id: "asdaf34123",
              title: 'Mi producto',
              quantity: 1,
              unit_price: 2000
            }
          ],
          marketplace_fee: 10,
          purpose: 'wallet_purchase'
        }
      };

      const response = await preference.create(preferenceData);
    return response;
  } catch (error) {
    console.error('Error creando la preferencia de pago:', error);
    throw new Error('Error creando la preferencia de pago: ' + error.message);
  }
};

module.exports = {
  createPreference
};
