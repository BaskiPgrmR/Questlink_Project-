const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Generates a JSON Web Token for a user.
 * @param {string} userId - The unique ID of the user.
 * @returns {string} The signed JWT.
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

/**
 * Verifies a JSON Web Token.
 * @param {string} token - The JWT to verify.
 * @returns {object} The decoded token payload.
 */
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken
};