const UserMercadoPago = require('../database/models/UserMercadoPago');
const authService = require('../services/authService');

exports.authUrl = (req, res) => {
  const useruuid = req.params.useruuid;
  const authUrl = authService.getAuthUrl(useruuid);
  res.redirect(authUrl);
};

exports.callback = async (req, res) => {
  const { code, state: userUUID } = req.query;

  try {
    // Intercambiar el código por un token de acceso
    const accessToken = await authService.exchangeCodeForToken(code);

    // Guardar o actualizar el usuario en la base de datos
    const user = await UserMercadoPago.findOneAndUpdate(
      { userUUID },
      { accessToken },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.send('Authentication successful. You can now use the access token.');
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    res.status(500).send('Authentication failed.');
  }
};

exports.renewToken = async (req, res) => {
  const { userUUID } = req.body;

  try {
    // Obtener un nuevo access token
    const tokenData = await authService.renewAccessToken();
    const { access_token: newAccessToken } = tokenData;

    // Actualizar el usuario en la base de datos con el nuevo access token
    const user = await UserMercadoPago.findOneAndUpdate(
      { userUUID },
      { accessToken: newAccessToken },
      { new: true }
    );

    res.status(200).json({ message: 'Token renewed successfully', accessToken: newAccessToken });
  } catch (error) {
    console.error('Error renewing token:', error);
    res.status(500).json({ message: 'Failed to renew token' });
  }
};