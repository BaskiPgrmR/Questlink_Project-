// This service provides high-level functions for interacting with Firestore and Firebase Auth.

const { db } = require('../config');
const { createUser } = require('../models/User.model');
const { createQuest } = require('../models/Quest.model');
const { createPartner } = require('../models/Partner.model.js');
const admin = require('../config/firebase.config');

const userCollection = db.collection('users');
const questsCollection = db.collection('quests');
const partnersCollection = db.collection('partnerships');

/**
 * Creates a new user document in Firestore.
 * @param {string} userId - The unique ID of the user.
 * @param {string} displayName - The user's display name.
 * @param {string} email - The user's email.
 */
const createNewUser = async (userId, displayName, email) => {
  const newUser = createUser(userId, displayName, email);
  await userCollection.doc(userId).set(newUser);
};

/**
 * Gets a user document by their ID.
 * @param {string} userId - The unique ID of the user.
 * @returns {Promise<FirebaseFirestore.DocumentData | undefined>} The user's document data.
 */
const getUserById = async (userId) => {
  const userDoc = await userCollection.doc(userId).get();
  return userDoc.exists ? userDoc.data() : undefined;
};

/**
 * Creates a new quest document in Firestore.
 * @param {object} questData - The quest blueprint from the AI.
 * @param {string} ownerId - The ID of the quest owner.
 * @returns {Promise<string>} The ID of the newly created quest.
 */
const createNewQuest = async (questData, ownerId) => {
  const newQuest = createQuest(questData, ownerId);
  const docRef = await questsCollection.add(newQuest);
  await docRef.update({ questId: docRef.id });
  return docRef.id;
};

/**
 * Updates a quest document by its ID.
 * @param {string} questId - The ID of the quest to update.
 * @param {object} updateData - The data to merge into the document.
 */
const updateQuest = async (questId, updateData) => {
  await questsCollection.doc(questId).update(updateData);
};

/**
 * Creates a new partnership document.
 * @param {string} partnerAId - The ID of the first partner.
 * @param {string} partnerBId - The ID of the second partner.
 * @param {string} sharedQuestId - The ID of the quest they are sharing.
 */
const createNewPartnership = async (partnerAId, partnerBId, sharedQuestId) => {
  const newPartner = createPartner(partnerAId, partnerBId, sharedQuestId);
  await partnersCollection.add(newPartner);
};

module.exports = {
  createNewUser,
  getUserById,
  createNewQuest,
  updateQuest,
  createNewPartnership
};