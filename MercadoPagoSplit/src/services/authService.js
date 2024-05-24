const axios = require('axios');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const appId = process.env.APP_ID

exports.getAuthUrl = () => {
  const authUrl = `https://auth.mercadopago.com.ar/authorization?client_id=${appId}&response_type=code&platform_id=mp&state=AUTORIZACIONCLIENTE&redirect_uri=${redirectUri}`;
  return authUrl;
};

exports.getAccessToken = async (code) => {
  const tokenUrl = 'https://api.mercadopago.com/oauth/token';
  const payload = {
    grant_type: 'authorization_code',
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
    redirect_uri: redirectUri
  };

  try {
    const response = await axios.post(tokenUrl, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
