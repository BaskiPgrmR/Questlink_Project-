const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const questsRoutes = require('./quests.routes');
const partnersRoutes = require('./partners.routes');

router.use('/auth', authRoutes);
router.use('/quests', questsRoutes);
router.use('/partners', partnersRoutes);

module.exports = router;
