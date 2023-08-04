// config.bootstrap.js

const configService = require('../services/config.service');
const logger = require('../helpers/logger.helper');


// ---------------------------------------------------------------------------
// PUBLIC FUNCTIONS
// ---------------------------------------------------------------------------

/**
 * Launch the configuration load process.
 */
function loadConfig() {
  configService.loadConfig();
  logger.info('Config loaded successfully.');
}

module.exports = {
  loadConfig,
};
