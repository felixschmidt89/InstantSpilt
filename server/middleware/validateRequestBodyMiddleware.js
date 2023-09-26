import { StatusCodes } from 'http-status-codes';

/**
 * Middleware to validate the presence of required properties in req.body.
 *
 * @param {string[]} requiredProperties - An array of property names that are required.
 */
export const validateRequestBodyMiddleware = (requiredProperties) => {
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

/**
 * validates the presence of the userName property in the req.body.
 */
export const validateUserNamePropertyPresenceMiddleware =
  validateRequestBodyMiddleware(['userName']);

export const validateGroupNamePropertyPresenceMiddleware =
  validateRequestBodyMiddleware(['groupName']);
