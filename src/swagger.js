const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const signale = require('./utils/signale');
const pjson = require('../package.json');

const swagger = (app, appConfig) => {
  const swaggerDefinition = {
    info: {
      title: `${pjson['name']}`,
      version: `${pjson['version']}`,
      description: `Swagger - ${pjson['description']}`,
    },
    basePath: appConfig['server']['context'],
  };

  const options = {
    swaggerDefinition,
    apis: ['./api-swagger.yaml'],
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.use(`/${appConfig['swagger']['path']}`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  signale.info('Swagger is enabled in : /api-docs');
};

module.exports = swagger;
