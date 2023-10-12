import { StatusCodes } from 'http-status-codes';
import File from '../models/File.js';
import logDevErrorHelper from '../helpers/logDevErrorHelper.js';
import sendInternalErrorHelper from '../helpers/sendInternalErrorHelper.js';

export const uploadImage = async (req, res) => {
  try {
    // Retrieve necessary information from the request or request body
    const { originalname, path, mimetype, size } = req.file;

    // Create a new File document
    const newFile = new File({
      filename: originalname,
      filePath: path,
      fileMimetype: mimetype,
      size,
    });

    const savedFile = await newFile.save();

    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: { savedFile },
      message: 'Image stored successfully',
    });
  } catch (error) {
    logDevErrorHelper('Error uploading image:', error);
    sendInternalErrorHelper(res);
  }
};
