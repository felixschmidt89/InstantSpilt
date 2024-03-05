import CryptoJS from 'crypto-js';

import { encryptData } from '../utils/encryptionUtils.js'; // Import encryption function

export const encryptMiddleware = (req, res, next) => {
  if (req.body && req.body.groupCode) {
    // Encrypt the entire request body using the groupCode
    req.body = encryptData(req.body, req.body.groupCode);
  }
  next();
};

export const decryptMiddleware = (req, res, next) => {
  if (req.encryptedData && req.body.groupCode) {
    // Decrypt the entire request body using the groupCode
    req.body = decryptData(req.encryptedData, req.body.groupCode);
  }
  next();
};

// Function to encrypt data using the groupcode as the key
function encryptData(data, key) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

// Function to decrypt data using the groupcode as the key
function decryptData(encryptedData, key) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
