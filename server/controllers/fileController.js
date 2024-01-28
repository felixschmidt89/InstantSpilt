import { StatusCodes } from 'http-status-codes';
import cloudinary from '../config/cloudinaryConfig.js';
import File from '../models/File.js';
import { errorLog, sendInternalError } from '../utils/errorUtils.js';

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'No file uploaded.' });
    }

    // Use Cloudinary to upload the file
    const result = await cloudinary.uploader.upload(req.file.path);
    const cloudinaryURL = result.secure_url;

    // Retrieve necessary information from the request or request body
    const { originalname, path, mimetype, size } = req.file;

    // Create a new File document
    const newFile = new File({
      filename: originalname,
      filePath: path,
      fileMimetype: mimetype,
      size,
      cloudinaryURL,
    });

    const savedFile = await newFile.save();

    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      savedFile,
      message: 'Image stored successfully',
      cloudinaryURL,
    });
  } catch (error) {
    errorLog(
      error,
      'Error uploading image:',
      'Failed to upload image. Please try again later.',
    );
    sendInternalError();
  }
};
