const authService = require('../services/authService');

exports.login = (req, res) => {
  const authUrl = authService.getAuthUrl();
  res.redirect(authUrl);
};

exports.callback = async (req, res) => {
  try {
    const code = req.query.code;
    const token = await authService.getAccessToken(code);
    res.json(token);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
