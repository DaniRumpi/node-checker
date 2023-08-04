const axios = require('axios');
const logger = require('../helpers/logger.helper');
const environment = require('./config.service');
const enodesCacheStorage = require('../cachedStorage/checkedPeeds.cachedStorage');

async function getNodePeers(body) {
  const { bootnode } = environment.getConfig();
  const { EnodesAllowed } = environment.getConfig();
  let allowEnodes = [];
  if (EnodesAllowed) {
    allowEnodes = EnodesAllowed;
  } else {
    const bootnodeEnode = await axios.post(`${bootnode.url}:${bootnode.port}`, { method: 'admin_nodeInfo', id: 1 });
    const allowEnodesResponse = await axios.post(`${bootnode.url}:${bootnode.port}`, body.besuCall);
    for (let i = 0; i < allowEnodesResponse.data.result.length; i += 1) {
      allowEnodes.push(allowEnodesResponse.data.result[i].enode);
    }
    allowEnodes.push(bootnodeEnode.data.result.enode);
  }
  const nodePeers = await axios.post(body.nodeURL, body.besuCall);
  const pubKeysEnodes = enodesCacheStorage.parseNodes(allowEnodes, nodePeers.data.result);
  logger.info('Formated list of enodes connected');
  return pubKeysEnodes;
}

async function checkNodePeers(peersConnected) {
  const enodesAllowed = peersConnected.allow.pubKeysAllowEnodes;
  const enodesConnected = peersConnected.connected.pubKeysEnodes;
  const checkedEnodes = enodesCacheStorage.checkNodePeers(enodesAllowed, enodesConnected);
  const response = {
    enodesConnected: peersConnected.allow.allowNodes,
    enodesNotAllowed: checkedEnodes,
  };

  return {
    resCode: 201,
    res: response,
  };
}

module.exports = {
  getNodePeers,
  checkNodePeers,
};
