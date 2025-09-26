const createUser = (userId, displayName, email) => {
  return {
    userId: userId,
    displayName: displayName,
    email: email,
    createdAt: new Date(),
    xp: 0,
    level: 1,
    activeQuestId: null,
    sharedQuests: []
  };
};

module.exports = { createUser };