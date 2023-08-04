// logger.helper.js

const log4js = require('log4js');

let logger = null;

function debug(message) {
  logger.debug(` << [${message}] >>`);
}

function info(message) {
  logger.info(` -- [${message}] --`);
}

function error(message) {
  logger.error(` ¡¡ [${message}] !!`);
}

function warning(message) {
  logger.warn(` 0j0 [${message}] 0j0`);
}

function printObj(obj) {
  logger.debug(obj);
}

function printObjError(obj) {
  logger.error(obj);
}

function startLogger(name, logLevel) {
  logger = log4js.getLogger(name);
  logger.level = logLevel;
}

function startDefaultLogger() {
  logger = log4js.getLogger();
  logger.level = 'info';
}

module.exports = {
  debug,
  info,
  error,
  warning,
  printObj,
  printObjError,
  startLogger,
  startDefaultLogger,
};
