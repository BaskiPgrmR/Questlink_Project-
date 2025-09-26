const createPartner = (partnerAId, partnerBId, sharedQuestId) => {
  return {
    partnerA: partnerAId,
    partnerB: partnerBId,
    status: 'active',
    sharedQuestId: sharedQuestId,
    createdAt: new Date()
  };
};

module.exports = { createPartner };
