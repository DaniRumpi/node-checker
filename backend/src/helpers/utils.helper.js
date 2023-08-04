// utils.helper.js

const fs = require('fs');

const logger = require('./logger.helper').default;

// ---------------------------------------------------------------------------
// PUBLIC FUNCTIONS
// ---------------------------------------------------------------------------

/**
 * Read a file asociated to the path given, using
 * UTF-8 encoding.
 *
 * @param {string} filePath absolute file path
 */
function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) { return reject(err); }
      return resolve(data);
    });
  });
}

function listFilesOfDirectory(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        logger.printObjError(err);
        reject(err);
      } else {
        logger.printObj(files);
        resolve(files);
      }
    });
  });
}

function getPubKey(str, start, end) {
  const char1 = str.indexOf(start) + 2;
  const char2 = str.lastIndexOf(end);
  return str.substring(char1, char2);
}

module.exports = {
  readFile,
  listFilesOfDirectory,
  getPubKey,
};
