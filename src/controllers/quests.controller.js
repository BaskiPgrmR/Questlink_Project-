const { createQuestForUser } = require('../services/quest.service');
const { asyncHandler } = require('../utils/errorHandler');
const { db } = require('../config');

/**
 * Handles the creation of a new quest for a user.
 */
const createQuest = asyncHandler(async (req, res) => {
  const { userGoal } = req.body;
  const userId = req.userData.userId; // Extracted from the token by authMiddleware

  if (!userGoal) {
    return res.status(400).json({ message: 'User goal is required to create a quest.' });
  }

  const quest = await createQuestForUser(userId, userGoal);

  res.status(201).json({ message: 'Quest created successfully!', quest });
});

/**
 * Gets a quest by its ID and returns its data.
 */
const getQuestById = asyncHandler(async (req, res) => {
  const { questId } = req.params;

  const questDoc = await db.collection('quests').doc(questId).get();

  if (!questDoc.exists) {
    return res.status(404).json({ message: 'Quest not found.' });
  }

  res.status(200).json({ quest: questDoc.data() });
});

module.exports = { createQuest, getQuestById };