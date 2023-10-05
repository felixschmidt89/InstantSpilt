import { StatusCodes } from 'http-status-codes';

export const checkHealth = (req, res) => {
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: null,
    message: 'Health check successful',
  });
};
