import { StatusCodes } from 'http-status-codes';
import { customAlphabet } from 'nanoid';
import Group from '../models/Group.js';
import Expense from '../models/Expense.js';
import Payment from '../models/Payment.js';
import { setLastActive } from '../utils/databaseUtils.js';
import { devLog, errorLog, sendInternalError } from '../utils/errorUtils.js';
import { generateUniqueGroupCode } from '../utils/groupCodeUtils.js';

/**
 * Creates a new group with a globally unique group ID
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} The created group object.
 *
 */

export const createGroup = async (req, res) => {
  try {
    const { groupName } = req.body;
    const groupCode = await generateUniqueGroupCode();

    const group = await Group.create({ groupName, groupCode });

    // Set the lastActive property of the group to now
    setLastActive(groupCode);

    res.status(StatusCodes.CREATED).json({
      status: 'success',
      group,
      message: 'Group created',
    });
  } catch (error) {
    errorLog(
      error,
      'Error creating group:',
      'Failed to create the group. Please try again later.',
    );
    sendInternalError(res);
  }
};

export const changeGroupName = async (req, res) => {
  try {
    const { groupCode, groupName } = req.body;
    const group = await Group.findOneAndUpdate({ groupCode });

    // Set the lastActive property of the group to now
    setLastActive(groupCode);

    const updatedGroup = await Group.findByIdAndUpdate(
      group._id,
      { $set: { groupName } },
      { new: true, runValidators: true },
    );
    res.status(StatusCodes.OK).json({
      status: 'success',
      updatedGroup,
      message: 'Group name updated successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error updating group name:',
      'Failed to update group name. Please try again later.',
    );
    sendInternalError(res);
  }
};

export const listGroupNamesByStoredGroupCodes = async (req, res) => {
  try {
    const { storedGroupCodes } = req.query;
    const groupCodesArray = storedGroupCodes.split(',');
    const groups = await Group.find({ groupCode: { $in: groupCodesArray } });
    const groupNames = groups.map((group) => group.groupName);
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: groupNames.length,
      groupNames,
      message: 'Group names retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error listing group names:',
      'Failed to list group names. Please try again later.',
    );
    sendInternalError(res);
  }
};

export const listExpensesAndPaymentsByGroup = async (req, res) => {
  try {
    const { groupCode } = req.params;
    // Set the lastActive property of the group to now
    setLastActive(groupCode);
    const [expenses, payments] = await Promise.all([
      Expense.find({ groupCode }).populate('expensePayer', 'userName'),
      Payment.find({ groupCode })
        .populate('paymentMaker', 'userName')
        .populate('paymentRecipient', 'userName'),
    ]);

    const groupExpensesAndPayments = [...expenses, ...payments];

    groupExpensesAndPayments.sort((a, b) => a.createdAt - b.createdAt);

    res.status(StatusCodes.OK).json({
      status: 'success',
      groupExpensesAndPayments,
      message: 'All group expenses and payments retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error listing expenses and payments:',
      'Failed to list expenses and payments. Please try again later.',
    );
    sendInternalError(res);
  }
};

export const getGroupInfo = async (req, res) => {
  try {
    const { groupCode } = req.params;

    // Set the lastActive property of the group to now
    setLastActive(groupCode);
    const group = await Group.findOne({ groupCode });

    res.status(StatusCodes.OK).json({
      status: 'success',
      group,
      message: 'Group info retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error fetching group info:',
      'Failed to fetch group information. Please try again later.',
    );
    sendInternalError(res);
  }
};

/**
 * Validates the existence of a group with the provided groupCode in the database.
 * Sends a response indicating whether the group exists or not.
 * @param {object} req
 * @param {object} res
 * @returns {object} JSON response with status, data (boolean value), and message fields.
 */
export const validateGroupExistence = async (req, res) => {
  try {
    const { groupCode } = req.params;
    const group = await Group.findOne({ groupCode });

    if (group) {
      res.status(StatusCodes.OK).json({
        status: 'success',
        exists: true,
        message: 'The group exists',
      });
    } else {
      res.status(StatusCodes.OK).json({
        status: 'success',
        exists: false,
        message: 'The group does not exist',
      });
    }
  } catch (error) {
    errorLog(
      error,
      'Error fetching group info:',
      'Failed to fetch group information. Please try again later.',
    );
    sendInternalError(res);
  }
};

// FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY

export const listAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: groups.length,
      groups,
      message: 'All groups retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error listing all groups:',
      'Failed to list all groups. Please try again later.',
    );
    sendInternalError(res);
  }
};

export const deleteAllGroups = async (req, res) => {
  try {
    await Group.deleteMany();
    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
      message: 'All groups deleted successfully.',
    });
  } catch (error) {
    errorLog(
      error,
      'Error deleting all groups:',
      'Failed to delete all groups. Please try again later.',
    );
    sendInternalError(res);
  }
};
