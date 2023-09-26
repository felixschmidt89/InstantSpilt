import { StatusCodes } from 'http-status-codes';

const developmentOnlyMiddleware = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    next();
  } else {
    res.status(StatusCodes.FORBIDDEN).json({ error: 'Access denied.' });
  }
};

export default developmentOnlyMiddleware;
