const { verifyToken } = require('../utils/jwt.utils');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Expects format: "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed. No token provided.' });
    }
    const decodedToken = verifyToken(token);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};

module.exports = { authMiddleware };
