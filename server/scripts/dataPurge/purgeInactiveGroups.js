import Expense from '../../models/Expense.js';
import Group from '../../models/Group.js';
import Payment from '../../models/Payment.js';
import User from '../../models/User.js';

const purgeInactiveGroups = async () => {
  // Set cutoffDate to 180 days
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 180);

  try {
    console.log('Find groups to purge');
    // Find groups with lastActive more than 180 days ago
    const groupsToPurge = await Group.find({ lastActive: { $lt: cutoffDate } });

    let purgedCount = 0;

    for (const group of groupsToPurge) {
      // Delete associated Payment, User, and Expense documents
      await Payment.deleteMany({ groupCode: group.groupCode });
      await User.deleteMany({ groupCode: group.groupCode });
      await Expense.deleteMany({ groupCode: group.groupCode });

      // Delete the Group document itself
      await Group.deleteOne({ _id: group._id });
      purgedCount += 1;
    }

    console.log(`Purging complete. ${purgedCount} groups purged.`);
  } catch (error) {
    console.error('Error purging inactive groups:', error);
  }
};

export default purgeInactiveGroups;
