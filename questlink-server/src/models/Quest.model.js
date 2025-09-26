const createQuest = (questData, ownerId) => {
  return {
    questId: null, // This will be set by Firebase later
    ownerId: ownerId,
    partnerId: null, // Partner ID will be added upon linking
    status: 'active',
    questTitle: questData.questTitle,
    narrativeHook: questData.narrativeHook,
    chapters: questData.chapters.map(chapter => ({
      ...chapter,
      status: 'pending',
      challenges: chapter.challenges.map(challenge => ({
        ...challenge,
        userAnswer: null,
        completedBy: null
      }))
    })),
    bossLevel: {
      ...questData.bossLevel,
      status: 'pending'
    },
    finalEnding: questData.finalEnding,
    createdAt: new Date(),
    sharedCode: null // This will be generated for partner linking
  };
};

module.exports = { createQuest };