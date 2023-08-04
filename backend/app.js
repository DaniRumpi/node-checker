// app.js

const configBootstrap = require('./src/bootstrap/config.bootstrap');
const expressBootstrap = require('./src/bootstrap/express.bootstrap');
const loggerBootstrap = require('./src/bootstrap/logger.bootstrap');
const logger = require('./src/helpers/logger.helper');

(async () => {
  try {
    // 1. Create logger default
    loggerBootstrap.startDefaultLogger();
    logger.info('Starting application...');

    // 2. Load Config
    await configBootstrap.loadConfig();

    // 3. Create logger using config
    loggerBootstrap.startLogger();

    // 4. Start swagger
    await expressBootstrap.startExpressServer();

    logger.info('Application successfully started.');
  } catch (err) {
    logger.error('Error while starting application.');
    logger.error(err);
    process.exit(-1);
  }
})();
