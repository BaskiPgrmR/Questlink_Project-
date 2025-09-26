const express = require('express');
const router = express.Router();
const questsController = require('../controllers/quests.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

// POST /api/quests/create
// Creates a new quest for an authenticated user.
router.post('/create', authMiddleware, questsController.createQuest);

// GET /api/quests/:questId
// Gets a quest document by its ID for an authenticated user.
router.get('/:questId', authMiddleware, questsController.getQuestById);

module.exports = router;
