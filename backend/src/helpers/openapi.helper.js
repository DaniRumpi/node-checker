// openapi.helper.js

const openapi = require('express-openapi');
const utilsHelper = require('./utils.helper');
const logger = require('./logger.helper');

// ---------------------------------------------------------------------------
// PRIVATE FUNCTIONS
// ---------------------------------------------------------------------------

/**
 * Transform and parse an openapi error object, which
 * is usually thrown by validation errors.
 * @param {*} openapiError openapi error object
 * @param {*} ajvError detailed ajv error object
 */
// eslint-disable-next-line no-unused-vars
function validationErrorParser(openapiError, ajvError) {
  logger.info('Openapi error transformer parsing...');
  const resObj = {
    statusCode: 400,
    response: {
      message: 'Validation error',
      description: `${openapiError.path} ${openapiError.message} (${openapiError.errorCode})`,
      level: 'error',
    },
  };
  throw resObj;
}

// ---------------------------------------------------------------------------
// PUBLIC FUNCTIONS
// ---------------------------------------------------------------------------

/**
 * Configure and initialize express-openapi. For operation
 * handlers settings, it needs an object with keys
 * corresponding to operation identificators included in
 * api definition (namely, swagger yml)
 *
 * @param {string} swaggerYmlPath absolute file path of swagger
 * @param {*} expressServer express server
 * @param {*} operationRoutes operation handlers
 * @param {*} errorMw error middleware handler
 */
async function initialize(swaggerYmlPath, expressServer, operationRoutes, errorMw) {
  const appApiDoc = await utilsHelper.readFile(swaggerYmlPath);
  openapi.initialize({
    apiDoc: appApiDoc,
    exposeApiDocs: false,
    app: expressServer,
    operations: operationRoutes,
    errorMiddleware: errorMw,
    errorTransformer: validationErrorParser,
  });
}

module.exports = {
  validationErrorParser,
  initialize,
};
