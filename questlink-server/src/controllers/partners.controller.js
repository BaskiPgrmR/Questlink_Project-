const { linkPartnerToQuest } = require('../services/quest.service');
const { asyncHandler } = require('../utils/errorHandler');

/**
 * Handles linking a user to a quest using a shared code.
 */
const linkPartner = asyncHandler(async (req, res) => {
  const { sharedCode } = req.body;
  const partnerId = req.userData.userId; // User joining the quest

  if (!sharedCode) {
    return res.status(400).json({ message: 'Shared code is required to link a partner.' });
  }

  const updatedQuest = await linkPartnerToQuest(sharedCode, partnerId);

  res.status(200).json({ message: 'Partner linked successfully!', quest: updatedQuest });
});

module.exports = { linkPartner };
