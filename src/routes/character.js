const httpClient = require('../utils/http-client');
const signale = require('../utils/signale');
const { toStringify } = require('../utils/converters');

module.exports = (app, appConfig) => {
  const { context } = appConfig['server'];

  app.get(encodeURI(`${context}/character`), async (req, res) => {
    try {
      const params = { name: 'rick', status: 'alive', page: 2 };

      const { status, data } = await httpClient.get('https://rickandmortyapi.com/api/character/', {
        params,
      });

      res.status(status).send(data);
    } catch (error) {
      signale.error({
        prefix: '[spa-config] ERROR',
        message: toStringify(error),
      });
      res
        .status(error.status || 409)
        .send({ error_message: error.message, status: error.status || 409 });
    }
  });
};
