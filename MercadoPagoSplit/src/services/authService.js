const axios = require('axios');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const appId = process.env.APP_ID

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
  return response.data.access_token;
};

exports.renewAccessToken = async () => {
  const tokenUrl = 'https://api.mercadopago.com/oauth/token';
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);

  const response = await axios.post(tokenUrl, params);
  return response.data;
};