// config.cachedStorage.js

// Config storage
let storageConfig = {};

// ---------------------------------------------------------------------------
// PUBLIC FUNCTIONS
// ---------------------------------------------------------------------------

function setConfig(newConfig) {
  storageConfig = newConfig;
}

function getConfig() {
  return storageConfig;
}

module.exports = {
  setConfig,
  getConfig,
};
