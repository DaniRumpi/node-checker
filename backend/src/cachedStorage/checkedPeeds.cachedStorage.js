const logger = require('../helpers/logger.helper');
const utils = require('../helpers/utils.helper');
const configService = require('../services/config.service');
const AppError = require('../models/appError.model');

function parseNodes(allowNodes, nodePeers) {
  logger.info('Getted connected Enodes');
  try {
    const enodes = [];
    const pubKeysEnodes = [];
    const pubKeysAllowEnodes = [];

    for (let i = 0; i < nodePeers.length; i += 1) {
      enodes.push(nodePeers[i].enode);
      pubKeysEnodes.push(utils.getPubKey(nodePeers[i].enode, '//', '@'));
    }
    for (let j = 0; j < allowNodes.length; j += 1) {
      pubKeysAllowEnodes.push(utils.getPubKey(allowNodes[j], '//', '@'));
    }

    const response = {
      allow: {
        allowNodes,
        pubKeysAllowEnodes,
      },
      connected: {
        enodes,
        pubKeysEnodes,
      },
    };

    return response;
  } catch (err) {
    const { ErrorBook } = configService.getConfig();
    const errBook = ErrorBook.E001;
    const errDesc = `${errBook.description} Details: ${err.message}`;
    throw new AppError(errBook.code, errBook.httpCode, errDesc, errBook.message);
  }
}

function checkNodePeers(nodesAllowed, nodesConnected) {
  logger.info('Checking Enodes connected with Allow Enodes');
  try {
    let notAllowed = false;
    const nodesNotAllowed = [];

    for (let k = 0; k < nodesConnected.length; k += 1) {
      if (nodesAllowed.includes(nodesConnected[k]) === false) {
        nodesNotAllowed.push(nodesConnected[k]);
        notAllowed = true;
      }
    }
    const response = {
      extraEnodes: notAllowed,
      pubKeysNotAllowed: nodesNotAllowed,
    };

    return response;
  } catch (err) {
    const { ErrorBook } = configService.getConfig();
    const errBook = ErrorBook.E002;
    const errDesc = `${errBook.description} Details: ${err.message}`;
    throw new AppError(errBook.code, errBook.httpCode, errDesc, errBook.message);
  }
}

module.exports = {
  checkNodePeers,
  parseNodes,
};
