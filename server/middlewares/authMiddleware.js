const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    const authHeader = req.header('Authorization') || req.header('x-auth-token');
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization token, access denied' });
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7).trim()
      : authHeader;

    const secret = process.env.JWT_SECRET || 'hotelpro_secret_jwt_key_2026_super_secure';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is invalid or expired' });
  }
};

