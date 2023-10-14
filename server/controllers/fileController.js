import { StatusCodes } from 'http-status-codes';
import File from '../models/File.js';
import logDevErrorHelper from '../utils/logDevErrorHelper.js';
import sendInternalErrorHelper from '../utils/sendInternalErrorHelper.js';
import cloudinary from 'cloudinary'; // Import Cloudinary

// Initialize Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dxmri7ajq',
  api_key: '993928482631351',
  api_secret: 'BzFqDCAbK06RzFO-QZh13ucnQ2k',
});

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'No file uploaded.' });
    }

    // Use Cloudinary to upload the file
    cloudinary.uploader.upload(req.file.path, async (result) => {
      // Handle the Cloudinary response as needed, e.g., store the URL in a database
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
        data: { savedFile },
        message: 'Image stored successfully',
        cloudinaryURL,
      });
    });
  } catch (error) {
    logDevErrorHelper('Error uploading image:', error);
    sendInternalErrorHelper(res);
  }
};
