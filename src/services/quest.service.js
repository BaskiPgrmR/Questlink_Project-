// This service handles the core business logic for quests and partnerships.

const { db } = require('../config');
const { generateUnifiedQuestBlueprint } = require('./gemini.service');
const { createNewQuest, updateQuest, createNewPartnership } = require('./firebase.service');
const { v4: uuidv4 } = require('uuid');

/**
 * Creates a new quest for a user by generating a blueprint and saving it to Firestore.
 * @param {string} userId - The ID of the quest owner.
 * @param {string} userGoal - The goal provided by the user.
 * @returns {Promise<object>} The newly created quest document data.
 */
const createQuestForUser = async (userId, userGoal) => {
  const questBlueprint = await generateUnifiedQuestBlueprint(userGoal);
  const questId = await createNewQuest(questBlueprint, userId);
  const sharedCode = uuidv4().slice(0, 8).toUpperCase();
  await updateQuest(questId, { sharedCode });

  const questDoc = await db.collection('quests').doc(questId).get();
  return { id: questId, ...questDoc.data() };
};

/**
 * Links a partner to an existing quest using a shared code.
 * @param {string} sharedCode - The unique code for the quest.
 * @param {string} partnerId - The ID of the user joining the quest.
 * @returns {Promise<object>} The updated quest document data.
 */
const linkPartnerToQuest = async (sharedCode, partnerId) => {
  const questsRef = db.collection('quests');
  const q = questsRef.where('sharedCode', '==', sharedCode);
  const querySnapshot = await q.get();

  if (querySnapshot.empty) {
    throw new Error('Quest not found or code is invalid.');
  }

  const questDoc = querySnapshot.docs[0];
  const questId = questDoc.id;

  // Check if the quest already has a partner
  if (questDoc.data().partnerId) {
    throw new Error('This quest already has an active partner.');
  }

  await updateQuest(questId, { partnerId: partnerId });
  await createNewPartnership(questDoc.data().ownerId, partnerId, questId);

  const updatedQuestDoc = await questsRef.doc(questId).get();
  return { id: questId, ...updatedQuestDoc.data() };
};

module.exports = {
  createQuestForUser,
  linkPartnerToQuest
};
