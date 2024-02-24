import { StatusCodes } from 'http-status-codes';
import rateLimit from 'express-rate-limit';

// Define the rate limiting config:
const laxLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 250, // Limit each IP to 250 requests per windowMs
});

/**
 * Middleware to laxly handle rate limit exceedance for continuous in app groupCode validation. Limited to 250 requests per 15 minutes, so that it can't be exploited easily by a malicious user while not limiting regular users.
 *Responds with a 429 status (TOO MANY REQUESTS) and an error message when the rate limit is exceeded.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function laxLimitRequestsPerIpMiddleware(req, res, next) {
  if (req.rateLimit.remaining) {
    next();
  } else {
    res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      error: 'Too many attempts. Please try again later.',
    });
  }
}

export { laxLimiter, laxLimitRequestsPerIpMiddleware };
