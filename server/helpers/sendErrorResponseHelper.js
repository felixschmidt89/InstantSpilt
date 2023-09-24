import { StatusCodes } from "http-status-codes";

export const sendErrorResponseHelper(res, statusCode, message) => {
  return res.status(StatusCode).json({ error: message });
}

export const internalServerErrorResponse = sendErrorResponseHelper(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error. Please try again later.');
