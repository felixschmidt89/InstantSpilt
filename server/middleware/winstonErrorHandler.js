import winstonLogger from '../utils/winstonLogger.js';
import { StatusCodes } from 'http-status-codes';

const winstonErrorHandler = (error, req, res, next) => {
  winstonLogger.error('An error occurred:', error);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: 'Internal server error' });
};

export default winstonErrorHandler;
