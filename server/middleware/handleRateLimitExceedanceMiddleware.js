import { StatusCodes } from 'http-status-codes';
import rateLimit from 'express-rate-limit';

// Define the rate limiting config:
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 5 requests per windowMs
});

/**
 * Middleware to handle rate limit exceedance.
 *
 * Responds with a 429 status (TOO MANY REQUESTS) and an error message when the rate limit is exceeded.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function handleRateLimitExceedance(req, res, next) {
  if (req.rateLimit.remaining) {
    next();
  } else {
    res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      error: 'Too many attempts. Please try again later.',
    });
  }
}

export { limiter, handleRateLimitExceedance };
