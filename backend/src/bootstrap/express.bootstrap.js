// express.bootstrap.js

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const openapiHelper = require('../helpers/openapi.helper');
// const authSecurity = require('../security/auth.security');
const operationRoute = require('../routes/operation.route');
const configService = require('../services/config.service');
const logger = require('../helpers/logger.helper');

// Default server port
const DEFAULT_PORT = 8080;

// ---------------------------------------------------------------------------
// PRIVATE FUNCTIONS
// ---------------------------------------------------------------------------
/**
 * Build an error object from a formatted generic error.
 *
 * Change the error object information depending on the contents
 * of the 'err' object provided as argument.
 * @param err thrown error object
 */
function buildObjectError(err) {
  // Generic formatted error object
  const resObj = {
    statusCode: 500,
    response: {
      message: 'Internal Server Error',
      level: 'error',
    },
  };

  // Update error properties if provided
  if (err.statusCode) { resObj.statusCode = err.statusCode; }
  if (err.response && err.response.code) { resObj.response.code = err.response.code; }
  if (err.response && err.response.message) { resObj.response.message = err.response.message; }
  if (err.response && err.response.description) {
    resObj.response.description = err.response.description;
  }
  if (err.response && err.response.level) { resObj.response.level = err.response.level; }

  return resObj;
}

/**
 * Error middleware of express. Parse and transform
 * any thrown error to formatted error.
 *
 * The following parameters are needed and compulsory,
 * do not remove.
 * @param {*} err thrown error object
 * @param {*} req express request object
 * @param {*} res express response object
 * @param {*} next express next object
 */
// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, next) {
  logger.info('Express error middleware parsing...');
  logger.printObjError(JSON.stringify(err));

  const resObj = module.exports.buildObjectError(err);
  return res.status(resObj.statusCode).json(resObj.response);
}

// ---------------------------------------------------------------------------
// PUBLIC FUNCTIONS
// ---------------------------------------------------------------------------

/**
 * Configure and launch the express server, together
 * with OpenAPI framework.
 */
async function startExpressServer() {
  const { port, swagger } = configService.getConfig().service;
  const appPort = port || DEFAULT_PORT;

  // Creation of express server
  const app = express();

  // Registration of middlewares
  app.use(helmet()); // enhance HTTP headers security
  app.use(cors()); // enable CORS
  app.use(bodyParser.json()); // parse requests body

  // Registration of custom middlewares
  // app.use('/users', authSecurity.validateUser); // users path authentication

  // Initialize openapi
  const swaggerPath = path.resolve(`${swagger.directory}${path.sep}${swagger.filename}`);
  await openapiHelper.initialize(swaggerPath, app, operationRoute, errorMiddleware);

  // Start listening
  app.listen(appPort);
  logger.info(`Express server running on port ${appPort}...`);
}

module.exports = {
  buildObjectError,
  errorMiddleware,
  startExpressServer,
};
