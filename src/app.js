const express = require('express');
const config = require('config');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const signale = require('./utils/signale');
const swagger = require('./swagger');
const routes = require('./routes/routes');
const pjson = require('../package.json');
const { toStringify } = require('./utils/converters');

const appConfig = config;
const serverConfig = appConfig['server'];
const swaggerConfig = appConfig['swagger'];

serverConfig['enabledLogs'] == 'false' ? signale.disable() : signale.enable();

let corsOptions = {
  methods: `${serverConfig['methodsAllowed']}`,
  credentials: serverConfig['corsCredentials'],
  allowedHeaders: `${serverConfig['headersAllowed']}`,
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  const output_reqHeaders = {
    output: req.headers,
  };
  const output_reqBody = {
    output: req.body,
  };

  if (serverConfig['showLogInterceptor'] == 'true') {
    signale.info({
      prefix: `[INTERCEPTOR] REQUEST TO`,
      message: encodeURI(req['url']),
    });
    signale.info({
      prefix: `[INTERCEPTOR] REQUEST HEADERS`,
      message: toStringify(output_reqHeaders),
    });
    signale.info({
      prefix: `[INTERCEPTOR] REQUEST BODY `,
      message: toStringify(output_reqBody),
    });
  }

  const allowedOrigins = serverConfig['origins'].split(',');
  const origin = req['headers']['origin'] || '*';
  corsOptions['origin'] = origin;

  if (serverConfig['corsEnabled'] == 'true' && allowedOrigins.includes(origin)) {
    corsOptions['origin'] = origin;
    corsOptions['credentials'] = true;
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', `${serverConfig['methodsAllowed']}`);
    res.header('Access-Control-Allow-Headers', `${serverConfig['headersAllowed']}`);
    res.header('Access-Control-Allow-Credentials', `${corsOptions['credentials']}`);
  }

  next();
});

signale.info('Using cors config: ', toStringify(corsOptions));
app.use(cors(corsOptions));

if (swaggerConfig['enabled'] == 'true') {
  swagger(app, appConfig);
}

routes(app, appConfig, pjson['version']);

module.exports = app;
