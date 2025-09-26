const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// POST /api/auth/google-login
// Handles user login via Google ID token.
router.post('/google-login', authController.googleLogin);

module.exports = router;
