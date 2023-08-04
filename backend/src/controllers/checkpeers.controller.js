const checkNodesService = require('../services/checkpeers.service');
const responseController = require('./response.controller');
const logger = require('../helpers/logger.helper');

async function checkNodePeers(req) {
  logger.info('Checking nodes connected');
  try {
    const peersConnected = await checkNodesService.getNodePeers(req.body);
    const peersChecked = await checkNodesService.checkNodePeers(peersConnected);
    return responseController.response(peersChecked);
  } catch (err) {
    logger.error(`Unexpected error on getNodePeers. ${err.message}`);
    const errResponse = {
      errorCode: err.code,
      response: err.getError(),
    };
    return responseController.error(errResponse);
  }
}

module.exports = {
  checkNodePeers,
};
