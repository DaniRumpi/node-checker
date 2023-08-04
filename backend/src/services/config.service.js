// config.service.js

const configPath = './config/config.yaml';
const yamljs = require('yamljs');
const configRepository = require('../cachedStorage/config.cachedStorage');

// ---------------------------------------------------------------------------
// PUBLIC FUNCTIONS
// ---------------------------------------------------------------------------

function loadConfig() {
  const result = yamljs.load(configPath);
  configRepository.setConfig(result);
}

function getConfig() {
  return configRepository.getConfig();
}

module.exports = {
  loadConfig,
  getConfig,
};
