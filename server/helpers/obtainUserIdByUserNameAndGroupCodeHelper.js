import User from '../models/User.js';
import logDevErrorHelper from './logDevErrorHelper.js';

/**
 * Obtains the objectId of a user by its groupCode and userName.
 *
 * @param {string} groupCode - The groupCode to search for.
 * @param {string} userName - The userName to search for.
 * @returns {Promise<string>} - The objectId of user.
 * @throws {Error} if the objectId is not found.
 */

const obtainUserIdByUserNameAndGroupCodeHelper = async (
  groupCode,
  userName,
) => {
  try {
    const user = await User.findOne({ groupCode, userName });
    if (!user) {
      throw new Error(
        `User with groupCode "${groupCode}" and username "${userName}"not found`,
      );
    }
    return user._id;
  } catch (error) {
    logDevErrorHelper(`Error obtaining the user's objectId:`, error);
    throw error;
  }
};

export default obtainUserIdByUserNameAndGroupCodeHelper;
