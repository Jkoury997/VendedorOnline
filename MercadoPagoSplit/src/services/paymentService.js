// src/services/paymentService.js
const { MercadoPagoConfig,Preference,OAuth } = require('mercadopago');
const authService = require("./authService")


const UserMercadoPago = require('../database/models/UserMercadoPago');

const createPreference = async (amount, userUUID, revendedorAmount,idempotencyKey) => {

    let revendedor = await UserMercadoPago.findOne({ userUUID });

    revendedor = await authService.renewAccessToken(revendedor.refreshToken)


    const newRevendedoraAccessToken = revendedor.access_token


    try {
    let client = new MercadoPagoConfig({ accessToken: newRevendedoraAccessToken});

    let preference = new Preference(client);




    const body = {
          items: [
            {
                id: "asdaf34123",
              title: 'Mi producto',
              quantity: 1,
              unit_price: 2000,
              currency_id:"ARS",
            },
            {
              id: "asdaf34233",
            title: 'Mi producto',
            quantity: 1,
            unit_price: 2000,
            currency_id:"ARS",
          }
          ],
          payment_method_id: 'master',
          back_urls:{
            success: "https://marcelakoury.com",
            failure: "https://marcelakoury.com",
            pending: "https://marcelakoury.com",
          },

          auto_return:"approved",
          marketplace: process.env.ACCESS_TOKEN,
          marketplace_fee: 3800,
        }


      const response = await preference.create({body,idempotencyKey});
      console.log(response)
      return response;
  } catch (error) {
    console.error('Error creando la preferencia de pago:', error);
    throw new Error('Error creando la preferencia de pago: ' + error.message);
  }
};

module.exports = {
  createPreference
};
