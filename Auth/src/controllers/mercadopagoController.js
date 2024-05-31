const UserMercadoPago = require('../database/models/UserMercadoPago');
const mercadopagoService = require('../services/mercadopagoService');

exports.callback = async (req, res) => {
    const { code, state: useruuid } = req.query;
  
    try {
      // Intercambiar el código por un token de acceso
      const tokenData = await mercadopagoService.exchangeCodeForToken(code);
      const {
        access_token: accessToken,
        token_type: tokenType,
        expires_in: expiresIn,
        scope,
        user_id: userId,
        refresh_token: refreshToken,
        public_key: publicKey,
        live_mode: liveMode,
      } = tokenData;
  
      // Guardar o actualizar el usuario en la base de datos
      const user = await UserMercadoPago.findOneAndUpdate(
        { useruuid },
        {
          accessToken,
          refreshToken,
          tokenType,
          expiresIn,
          scope,
          userId,
          publicKey,
          liveMode,
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
  
      res.status(200).json({ message: 'Authentication successful. You can now use the access token.' });
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      res.status(500).send('Authentication failed.');
    }
  };

  exports.renewToken = async (req, res) => {
    const { useruuid} = req.query;
  
    try {
      // Obtener el refreshToken del usuario
      const user = await UserMercadoPago.findOne({ useruuid });
  
      if (!user || !user.refreshToken) {
        return res.status(400).json({ message: 'User not found or no refresh token available' });
      }
  
      // Obtener un nuevo access token
      const tokenData = await mercadopagoService.renewAccessToken(user.refreshToken);
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
    const { useruuid } = req.query;
    try {
      const isCreated = await mercadopagoService.isUserCreated(useruuid);
      res.status(200).json({ isCreated });
    } catch (error) {
      res.status(500).json({ message: 'Failed to verify user creation' });
    }
  };