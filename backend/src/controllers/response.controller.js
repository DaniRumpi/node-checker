// response.controller.js

const logger = require('../helpers/logger.helper');

// ---------------------------------------------------------------------------
// PUBLIC FUNCTIONS
// ---------------------------------------------------------------------------

/**
 * Parse a given response and build a well-formatted response,
 * which can be understood by routers. If the structure of given
 * response is not valid, a generic error is returned instead.
 * The given response should has the following definition:
 *  - responseObj: { resCode: [integer], response: [{*}]}
 * The returning response (to routers) should has the following
 * definition:
 *  - result: { statusCode: [integer], response: [{*}]}
 * The statusCode is chosen depending on the response's code.
 *
 * @param {*} responseObj response object
 */
function response(responseObj) {
  const result = {
    statusCode: 500,
    response: {
      message: 'Internal Server Error',
      level: 'error',
    },
  };
  if (!responseObj || !responseObj.resCode) {
    logger.error('Unknown response handled. Generic error was thrown instead.');
    return result;
  }
  // Preprare response according to API definition
  // Match resCode from responseObj to corresponding statusCode
  logger.info(`Response with code: ${responseObj.resCode}`);
  result.statusCode = 200;
  result.response = responseObj.res;
  return result;
}

/**
 * Parse a given error and build a well-formatted error,
 * which can be understood by routers. If the structure of given
 * error is not valid, a generic error is returned instead.
 * The given error should has the following definition:
 *  - errorObj: { errorCode: [integer], [{*}]}
 * The returning error (to routers) should has the following
 * definition:
 *  - result: { statusCode: [integer], response: [{*}]}
 * The statusCode is chosen depending on the error's code.
 *
 * @param {*} errorObj error object
 */
function error(errorObj) {
  const result = {
    statusCode: 500,
    response: {
      message: 'Internal Server Error',
      level: 'error',
    },
  };
  // Preprare response according to API definition
  // Match errorCode from errorObj to corresponding statusCode
  if (!errorObj || !errorObj.errorCode) {
    logger.error('Unknown error handled. Generic error was thrown instead.');
    return result;
  }
  logger.error(`Error with code: ${errorObj.errorCode}`);
  result.statusCode = errorObj.errorCode;
  result.response = {
    message: errorObj.response.message,
  };
  return result;
}

module.exports = {
  response,
  error,
};
