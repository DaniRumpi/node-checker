// configApp.helper.js

module.exports = {
  logLevel: process.env.LOG_LEVEL,
  port: process.env.PORT,
  source: process.env.NODE_CONFIG_SOURCE_APP,
  file: process.env.NODE_CONFIG_FILE,
};
