// auth.security.js

const logger = require('../helpers/logger.helper');

// ---------------------------------------------------------------------------
// PUBLIC FUNCTIONS
// ---------------------------------------------------------------------------

/**
 * Extract the authorization token from request
 * and authenticate it.
 * @param {*} req express request object
 * @param {*} res express response object
 * @param {*} next express next object
 */
function validateUser(req, res, next) {
  const USER_AUTH_BEARER_PREFIX = 'Bearer ';
  if (req.headers.authorization && req.headers.authorization.startsWith(USER_AUTH_BEARER_PREFIX)) {
    const token = req.headers.authorization.slice(USER_AUTH_BEARER_PREFIX.length);
    if (token && token.length > 0) {
      logger.info('Auth token: ', token);
      logger.info('User Auth validation successful.');
      return next();
    }
  }
  logger.info('User auth validation failed.');
  const resObj = {
    statusCode: 401,
    response: {
      message: 'Unauthorized',
      level: 'error',
    },
  };
  return next(resObj);
}

module.exports = {
  validateUser,
};
