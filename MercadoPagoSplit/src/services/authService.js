const axios = require('axios');
const UserMercadoPago = require('../database/models/UserMercadoPago');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const appId = process.env.APP_ID;

exports.getAuthUrl = (useruuid) => {
  const authUrl = `https://auth.mercadopago.com.ar/authorization?client_id=${appId}&response_type=code&platform_id=mp&state=${useruuid}&redirect_uri=${redirectUri}`;
  return authUrl;
};

exports.exchangeCodeForToken = async (code) => {
  const tokenUrl = 'https://api.mercadopago.com/oauth/token';
  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirectUri);

  const response = await axios.post(tokenUrl, params);
  return response.data; // Devuelve todo el objeto para incluir access_token y refresh_token
};

exports.renewAccessToken = async (refreshToken) => {
  const tokenUrl = 'https://api.mercadopago.com/oauth/token';
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('refresh_token', refreshToken);

  const response = await axios.post(tokenUrl, params);
  return response.data; // Devuelve todo el objeto para incluir access_token y refresh_token
};


exports.isUserCreated = async (userUUID) => {
  try {
    const user = await UserMercadoPago.findOne({ userUUID, accessToken: { $exists: true }, refreshToken: { $exists: true } });
    return !!user;
  } catch (error) {
    console.error('Error verifying user creation:', error);
    throw new Error('Failed to verify user creation');
  }
};