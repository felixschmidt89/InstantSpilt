import { StatusCodes } from 'http-status-codes';

export const developmentOnly = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    next();
  } else {
    res.status(StatusCodes.FORBIDDEN).json({ error: 'Access denied.' });
  }
};
