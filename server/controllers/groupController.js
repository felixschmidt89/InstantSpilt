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
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const createGroup = async (req, res) => {
  try {
    const { groupName } = req.body;
    let groupCode;
    let isUnique = false;

    // Generates globally unique groupCode
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

// FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY

export const listAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: groups.length,
      data: { groups },
      message: 'Groups info retrieved successfully',
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
