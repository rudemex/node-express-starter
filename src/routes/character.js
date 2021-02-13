const httpClient = require('../utils/http-client');
const signale = require('../utils/signale');
const { toStringify } = require('../utils/converters');

module.exports = (app, appConfig) => {
  const { context } = appConfig['server'];
  const { apiRick } = appConfig['services'];

  app.get(encodeURI(`${context}/character`), async (req, res) => {
    try {
      const params = { ...req.query };

      const urlService = encodeURI(`${apiRick}/character/`);
      const { status, data } = await httpClient.get(urlService, { params });

      signale.success({
        prefix: '[character] RESPONSE BODY',
        message: toStringify(data),
      });

      res.status(status).send(data);
    } catch (error) {
      signale.error({
        prefix: '[character] ERROR',
        message: error,
      });
      res.status(error.status || error.response.status || 409).send({
        error_message: error.message,
        status: error.status || error.response.status || 409,
      });
    }
  });
};
