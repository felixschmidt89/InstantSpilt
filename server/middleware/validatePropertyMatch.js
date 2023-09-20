import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import obtainGroupObjectIdByGroupIdHelper from '../helpers/obtainGroupObjectIdByGroupId.js';

/**
 * Checks if a provided property value in the request body matches the one in the database.
 * @param {string} propertyName - The name of the property to check.
 * @param {Model} model - The Mongoose model to query for comparison.
 */
export const validatePropertyValueMatch = (propertyName, model) => {
  return async (req, res, next) => {
    try {
      const { [propertyName]: propertyValue, groupId } = req.body;
      const linkedGroup = await obtainGroupObjectIdByGroupIdHelper(groupId);

      const existingDocument = await model.findOne({
        linkedGroup,
        [propertyName]: propertyValue,
      });

      if (!existingDocument) {
        return res.status(StatusCodes.NOT_FOUND).json({
          error: `${model.modelName} does not exist in the database.`,
        });
      }
      next();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(
          `Error checking ${propertyName} value database match:`,
          error,
        );
      }
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal server error. Please try again later.' });
    }
  };
};

/**
 * Checks if the provided userName in the request body matches the one in the database.
 */
export const checkUserNameMatch = validatePropertyValueMatch('userName', User);
