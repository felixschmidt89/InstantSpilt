import User from '../models/User.js';
import logDevErrorHelper from './logDevErrorHelper.js';

/**
 * Obtains the userName of a user by the user's ObjectId.
 *
 * @param {string} userId - The ObjectId of the user.
 * @returns {Promise<string>} - The userName of the user.
 * @throws {Error} if the userName is not found.
 */

const obtainUserNameByUserIdHelper = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error(`User with ObjectId "${userId}" not found`);
    }

    return user.userName;
  } catch (error) {
    logDevErrorHelper(`Error obtaining the user's userName:`, error);
    throw error;
  }
};

export default obtainUserNameByUserIdHelper;
