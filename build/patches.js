const manifest = require('../src/manifest/mv2/manifest.json');
const manifestVersion = process.env.VERSION || manifest.version;

const pkgJson = require('../package.json');

module.exports = {
  manifestVersion,
  pkgJsonVersion: pkgJson.version,
}