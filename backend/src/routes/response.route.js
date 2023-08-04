// response.route.js

const logger = require('../helpers/logger.helper');

// ---------------------------------------------------------------------------
// PUBLIC FUNCTIONS
// ---------------------------------------------------------------------------

/**
 * Validate and parse a given response. If the given response
 * is not valid, a generic error is returned instead. The
 * given response should has the following definition:
 *  - resObj: { statusCode: [integer], response: [{*}]}
 *
 * @param {*} res express response object
 * @param {*} resObj response object
 */
function validateAndFormatResponse(res, resObj) {
  try {
    res.validateResponse(resObj.statusCode, resObj.response);
    return resObj;
  } catch (err) {
    logger.error('Error validating response.');
    logger.printObjError(err);
    return {
      statusCode: 500,
      response: {
        message: 'Internal Server Error',
        level: 'error',
      },
    };
  }
}

module.exports = {
  validateAndFormatResponse,
};
