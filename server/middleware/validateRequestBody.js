import { StatusCodes } from 'http-status-codes';

/**
 * Middleware to validate the presence of required properties in req.body.
 *
 * @param {string[]} requiredProperties - An array of property names that are required.
 */
const validateRequestBody = (requiredProperties) => {
  return (req, res, next) => {
    const missingProperties = requiredProperties.filter(
      (prop) => !req.body[prop],
    );

    if (missingProperties.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: `Required properties missing in the request body: ${missingProperties.join(
          ', ',
        )}`,
      });
    }

    next();
  };
};

export default validateRequestBody;
