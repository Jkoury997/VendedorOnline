// src/services/paymentService.js
const { MercadoPagoConfig,Preference } = require('mercadopago');
const authService = require("./authService")


const UserMercadoPago = require('../database/models/UserMercadoPago');

const createPreference = async (amount, userUUID, revendedorAmount,idempotencyKey) => {

    let revendedor = await UserMercadoPago.findOne({ userUUID });

    revendedor = await authService.renewAccessToken(revendedor.refreshToken)


    const newRevendedoraAccessToken = revendedor.access_token
    console.log(revendedor)

    try {
    let client = new MercadoPagoConfig({ accessToken: newRevendedoraAccessToken});

    let preference = new Preference(client);




    const body = {
          binary_mode: true,
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
