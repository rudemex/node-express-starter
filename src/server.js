const config = require('config');
const signale = require('./utils/signale');
const app = require('./app');

const pjson = require('../package.json');

const serverConfig = config['server'];
const port = parseInt(serverConfig['port'], 10) || 8080;

app.listen(port, () => {
  signale.info(`🏷 Version: ${pjson['version']}`);
  signale.success(`🚀 App running on port: ${port}`);
});
