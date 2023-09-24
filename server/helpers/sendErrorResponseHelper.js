import { StatusCodes } from "http-status-codes";

export const sendErrorResponse(res, statusCode, message) => {
  return res.status(StatusCode).json({ error: message });
}

export const internalServerErrorResponse = sendErrorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error. Please try again later.');
