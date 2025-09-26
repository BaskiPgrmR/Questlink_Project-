const { auth } = require('../config/firebase.config');
const { getUserById, createNewUser } = require('../services/firebase.service');
const { generateToken } = require('../utils/jwt.utils');
const { asyncHandler } = require('../utils/errorHandler');

/**
 * Handles user login with a Google ID token.
 */
const googleLogin = asyncHandler(async (req, res) => {
  const { googleIdToken } = req.body;

  if (!googleIdToken) {
    return res.status(400).json({ message: 'Google ID token is missing.' });
  }

  const decodedToken = await auth.verifyIdToken(googleIdToken);
  const { uid, email, name, picture } = decodedToken;

  let user = await getUserById(uid);
  if (!user) {
    await createNewUser(uid, name, email);
    user = await getUserById(uid);
  }

  const token = generateToken(uid);
  res.status(200).json({ token, user });
});

module.exports = { googleLogin };
