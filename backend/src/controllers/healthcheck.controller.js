// healthcheck.controller.js

const responseController = require('./response.controller');
const logger = require('../helpers/logger.helper').default;

// ---------------------------------------------------------------------------
// PUBLIC FUNCTIONS
// ---------------------------------------------------------------------------

// eslint-disable-next-line no-unused-vars
function healthcheck(req) {
  try {
    const response = {
      resCode: 2001,
      res: {
        message: 'Ok',
      },
    };
    return responseController.response(response);
  } catch (err) {
    logger.error(`Unexpected error on healthcheck. Err: ', ${err.message}`);
    return responseController.error(err);
  }
}

module.exports = {
  healthcheck,
};
