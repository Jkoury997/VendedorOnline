const UserMercadoPago = require('../database/models/UserMercadoPago');
const authService = require('../services/authService');

exports.authUrl = (req, res) => {

  const useruuid = req.params.useruuid;
  const authUrl = authService.getAuthUrl(useruuid);
  res.status(200).json({authUrl: authUrl})
};

exports.callback = async (req, res) => {
  const { code, state: userUUID } = req.query;
  console.log(code)
  try {
    // Intercambiar el código por un token de acceso
    console.log('Exchanging code for token...');
    const tokenData = await authService.exchangeCodeForToken(code);
    const { access_token: accessToken, refresh_token: refreshToken } = tokenData;

    // Guardar o actualizar el usuario en la base de datos
    console.log('Finding and updating user in database...');
    const user = await UserMercadoPago.findOneAndUpdate(
      { userUUID },
      { accessToken, refreshToken },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    console.log('User updated:', user);
    res.status(200).json({message: 'Authentication successful. You can now use the access token.'})
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    res.status(500).send('Authentication failed.');
  }
};

exports.renewToken = async (req, res) => {
  const { userUUID } = req.body;

  try {
    // Obtener el refreshToken del usuario
    const user = await UserMercadoPago.findOne({ userUUID });

    if (!user || !user.refreshToken) {
      return res.status(400).json({ message: 'User not found or no refresh token available' });
    }

    // Obtener un nuevo access token
    const tokenData = await authService.renewAccessToken(user.refreshToken);
    const { access_token: newAccessToken, refresh_token: newRefreshToken } = tokenData;

    // Actualizar el usuario en la base de datos con el nuevo access token y refresh token si está presente
    user.accessToken = newAccessToken;
    if (newRefreshToken) {
      user.refreshToken = newRefreshToken;
    }
    await user.save();

    res.status(200).json({ message: 'Token renewed successfully', accessToken: newAccessToken });
  } catch (error) {
    console.error('Error renewing token:', error);
    res.status(500).json({ message: 'Failed to renew token' });
  }
};

exports.verifyUserCreation = async (req, res) => {
  const { useruuid } = req.params;
  try {
    const isCreated = await authService.isUserCreated(useruuid);
    res.status(200).json({ isCreated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to verify user creation' });
  }
};


