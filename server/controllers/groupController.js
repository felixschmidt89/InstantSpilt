import { StatusCodes } from 'http-status-codes';
import { customAlphabet } from 'nanoid';
import Group from '../models/Group.js';
import Expense from '../models/Expense.js';
import Payment from '../models/Payment.js';
import sendInternalErrorHelper from '../helpers/sendInternalErrorHelper.js';
import isGroupCodeUniqueHelper from '../helpers/isGroupCodeUniqueHelper.js';
import logDevErrorHelper from '../helpers/logDevErrorHelper.js';

// Defines customAlphabet for groupCode generation (excluding those numbers and uppercase letters that are easily confused)
const nanoid = customAlphabet('ACDEFGHIJKLMNOPQRSTUVWXYZ346789');

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
    let groupCode;
    let isUnique = false;

    // Generate globally unique groupCode
    while (!isUnique) {
      groupCode = nanoid(6);
      // eslint-disable-next-line no-await-in-loop
      isUnique = await isGroupCodeUniqueHelper(groupCode);
    }

    const group = await Group.create({ groupName, groupCode });

    res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: { group },
      message: 'Group created',
    });
  } catch (error) {
    logDevErrorHelper('Error creating group:', error);
    sendInternalErrorHelper(res);
  }
};

export const changeGroupName = async (req, res) => {
  try {
    const { groupCode, groupName } = req.body;
    const group = await Group.findOneAndUpdate({ groupCode });

    const updatedGroup = await Group.findByIdAndUpdate(
      group._id,
      { $set: { groupName } },
      { new: true, runValidators: true },
    );
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: { updatedGroup },
      message: 'Group name updated successfully',
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      logDevErrorHelper('Error updating group name:', error);
      sendInternalErrorHelper(res);
    }
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
      data: { groupNames },
      message: 'Group names retrieved successfully',
    });
  } catch (error) {
    logDevErrorHelper('Error listing group names:', error);
    sendInternalErrorHelper(res);
  }
};

export const listExpensesAndPaymentsByGroup = async (req, res) => {
  try {
    const { groupCode } = req.params;
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
      data: { groupExpensesAndPayments },
      message: 'All group expenses and payments retrieved successfully',
    });
  } catch (error) {
    logDevErrorHelper('Error listing expenses and payments', error);
    sendInternalErrorHelper(res);
  }
};

export const getGroupInfo = async (req, res) => {
  try {
    const { groupCode } = req.params;

    const group = await Group.findOne({ groupCode });

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: { group },
      message: 'Group info retrieved successfully',
    });
  } catch (error) {
    logDevErrorHelper('Error fetching group info:', error);
    sendInternalErrorHelper(res);
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
        data: true,
        message: 'The group exists',
      });
    } else {
      res.status(StatusCodes.OK).json({
        status: 'success',
        data: false,
        message: 'The group does not exist',
      });
    }
  } catch (error) {
    logDevErrorHelper('Error fetching group info:', error);
    sendInternalErrorHelper(res);
  }
};

// FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY

export const listAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: groups.length,
      data: { groups },
      message: 'All groups retrieved successfully',
    });
  } catch (error) {
    logDevErrorHelper('Error listing all groups:', error);
    sendInternalErrorHelper(res);
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
    logDevErrorHelper('Error deleting all groups:', error);
    sendInternalErrorHelper(res);
  }
};
