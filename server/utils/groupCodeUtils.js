import { customAlphabet } from 'nanoid';
import { isGroupCodeUnique } from './databaseUtils.js';

// Defines customAlphabet for groupCode generation (excluding those numbers and uppercase letters that are easily confused)
const nanoid = customAlphabet('ACDEFGHIJKLMNOPQRSTUVWXYZ346789');

export const generateUniqueGroupCode = async () => {
  let groupCode;
  let isUnique = false;

  // Generate globally unique groupCode
  while (!isUnique) {
    groupCode = nanoid(8);
    // eslint-disable-next-line no-await-in-loop
    isUnique = await isGroupCodeUnique(groupCode);
  }

  return groupCode;
};
