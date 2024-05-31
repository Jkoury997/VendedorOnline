const UserMercadoPago = require('../database/models/UserMercadoPago');


exports.exchangeCodeForToken = async (code) => {
    const tokenUrl = 'https://api.mercadopago.com/oauth/token';
    const params = new URLSearchParams();
    params.append('client_id', process.env.MERCADOPAGO_CLIENT_ID);
    params.append('client_secret', process.env.MERCADOPAGO_CLIENT_SECRET);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', process.env.MERCADOPAGO_REDIRECT_URI);
  
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });
  
    if (!response.ok) {
      throw new Error('Failed to obtain OAuth tokens');
    }
  
    const data = await response.json();
    return data; // Devuelve todo el objeto para incluir access_token y refresh_token
  };
  

  exports.renewAccessToken = async (refreshToken) => {
    const tokenUrl = 'https://api.mercadopago.com/oauth/token';
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('client_id', process.env.MERCADOPAGO_CLIENT_ID);
    params.append('client_secret', process.env.MERCADOPAGO_CLIENT_SECRET);
    params.append('refresh_token', refreshToken);
  
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });
  
    if (!response.ok) {
      throw new Error('Failed to renew OAuth tokens');
    }
  
    const data = await response.json();
    return data; // Devuelve todo el objeto para incluir access_token y refresh_token
  };
  


exports.isUserCreated = async (useruuid) => {
  try {
    const user = await UserMercadoPago.findOne({ useruuid, accessToken: { $exists: true }, refreshToken: { $exists: true } });
    return !!user;
  } catch (error) {
    console.error('Error verifying user creation:', error);
    throw new Error('Failed to verify user creation');
  }
};