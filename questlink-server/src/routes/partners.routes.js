const express = require('express');
const router = express.Router();
const partnersController = require('../controllers/partners.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

// POST /api/partners/link
// Links an authenticated user to an existing quest via a shared code.
router.post('/link', authMiddleware, partnersController.linkPartner);

module.exports = router;