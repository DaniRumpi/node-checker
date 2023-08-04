// logger.bootstrap.js

const configService = require('../services/config.service');
const loggerHelper = require('../helpers/logger.helper');

function startLogger() {
  const { name, logLevel } = configService.getConfig().service;
  loggerHelper.startLogger(name, logLevel);
}

function startDefaultLogger() {
  loggerHelper.startDefaultLogger();
  loggerHelper.info('Default logger initialized.');
}

module.exports = {
  startLogger,
  startDefaultLogger,
};
