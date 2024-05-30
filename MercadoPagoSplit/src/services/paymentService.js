// src/services/paymentService.js
const { MercadoPagoConfig,Preference,OAuth } = require('mercadopago');
const authService = require("./authService")


const UserMercadoPago = require('../database/models/UserMercadoPago');

const createPreference = async (amount, userUUID, revendedorAmount,idempotencyKey) => {

    let revendedor = await UserMercadoPago.findOne({ userUUID });

    revendedor = await authService.renewAccessToken(revendedor.refreshToken)


    const newRevendedoraAccessToken = revendedor.access_token


    try {
    let client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN});

    let preference = new Preference(client);




    const body = {
          items: [
            {
                id: "asdaf34123",
              title: 'Mi producto',
              quantity: 1,
              unit_price: 2000,
              currency_id:"ARS",
            }
          ],
          payment_method_id: 'master',
          purpose: 'wallet_purchase',
          back_urls:{
            success: "https://marcelakoury.com",
            failure: "https://marcelakoury.com",
            pending: "https://marcelakoury.com",
          },
          token: newRevendedoraAccessToken,
          auto_return:"approved",
          application_fee: 300,
          transaction_amount: 2000,
        }


      const response = await preference.create({body,idempotencyKey});
      return response;
  } catch (error) {
    console.error('Error creando la preferencia de pago:', error);
    throw new Error('Error creando la preferencia de pago: ' + error.message);
  }
};

module.exports = {
  createPreference
};
