// operations.routes.js

const responseRouter = require('./response.route');
const healthcheckController = require('../controllers/healthcheck.controller');
const checkPeersController = require('../controllers/checkpeers.controller');
const logger = require('../helpers/logger.helper');


// ---------------------------------------------------------------------------
// PRIVATE FUNCTIONS
// ---------------------------------------------------------------------------

/**
 * Redirect the request to the handler given. It validates and
 * parses controller's response before returning it. The
 * controller's response should has this definition:
 *  - resObj: { statusCode: [integer], response: [{*}]}
 *
 * @param {*} req express request object
 * @param {*} res express response object
 * @param {*} next express next object
 * @param {*} handlerFn controller handler function
 */
async function passToHandler(req, res, next, handlerFn) {
  let resObj;
  try {
    resObj = await handlerFn(req);
    resObj = responseRouter.validateAndFormatResponse(res, resObj);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
  return res.status(resObj.statusCode).send(resObj.response);
}

// ---------------------------------------------------------------------------
// PUBLIC FUNCTIONS
// ---------------------------------------------------------------------------

function healthcheck(req, res, next) {
  return passToHandler(req, res, next, healthcheckController.healthcheck);
}

function checkNodePeers(req, res, next) {
  return module.exports.passToHandler(req, res, next, checkPeersController.checkNodePeers);
}

module.exports = {
  healthcheck,
  checkNodePeers,
  passToHandler, // for testing
};
