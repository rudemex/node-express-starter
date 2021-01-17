const axios = require('axios').default;
const https = require('https');
const { toStringify } = require('./converters');
const signale = require('./signale');
const config = require('config');
const serverConfig = config['server'];

const headers = {
  'Content-Type': 'application/json',
  Accept: `application/vnd.iman.v1+json, application/json, text/plain, */*`,
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  Pragma: 'no-cache',
};

const filterOptions = ({ ...rest }) => rest;

const prepareResponse = async (method, url, headers = {}, params = {}, data = {}) => {
  const options = {
    url,
    method,
    headers,
    params,
    data,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
      requestCert: false,
    }),
  };

  if (Object.keys(headers).length) {
    options['headers'] = { ...headers };
  }

  if (Object.keys(params).length) {
    options['params'] = { ...params };
  }

  if (Object.keys(data).length) {
    options['data'] = { ...data };
  }

  signale.info(`REQUEST TO: ${encodeURI(url)}`);

  try {
    return await axios(options);
  } catch (error) {
    signale.error({
      prefix: '[prepareResponse] ERROR',
      message: toStringify(error),
    });
    throw error;
  }
};

const fetch = async (url, options = {}) => {
  try {
    const instance = axios.create({ ...options });

    // INTERCEPTOR REQUEST
    instance.interceptors.request.use(
      (conf) => {
        if (serverConfig['showLogInterceptor'] == 'true') {
          signale.info({
            prefix: '[http-client][interceptor] REQUEST',
            message: toStringify(conf),
          });
        }
        return conf;
      },
      (error) => {
        if (serverConfig['showLogInterceptor'] == 'true') {
          signale.error({
            prefix: '[http-client][interceptor] REQUEST',
            message: toStringify(error),
          });
        }
        return Promise.reject(error);
      },
    );

    // INTERCEPTOR RESPONSE
    instance.interceptors.response.use(
      (response) => {
        if (serverConfig['showLogInterceptor'] == 'true') {
          signale.success('[http-client][interceptor] RESPONSE');
        }
        return response;
      },
      (error) => {
        if (serverConfig['showLogInterceptor'] == 'true') {
          signale.error('[http-client][interceptor] RESPONSE');
        }
        return Promise.reject(error);
      },
    );

    signale.info(`REQUEST TO: ${encodeURI(url)}`);

    return await instance.request({
      url,
      data: options['data'],
      params: options['params'],
      method: options['method'],
      headers: options['headers'],
    });
  } catch (error) {
    signale.error({
      prefix: '[http-client] ERROR',
      message: toStringify(error),
    });
    throw error;
  }
};

const get = async (url, options = {}) => {
  return await fetch(url, {
    method: 'GET',
    headers,
    ...filterOptions(options),
  });
};

const post = async (url, options = {}) => {
  return await fetch(url, {
    method: 'POST',
    headers,
    ...filterOptions(options),
  });
};

const put = async (url, options = {}) => {
  return await fetch(url, {
    method: 'PUT',
    headers,
    ...filterOptions(options),
  });
};

const del = async (url, options = {}) => {
  return await fetch(url, {
    method: 'DELETE',
    headers,
    ...filterOptions(options),
  });
};

module.exports = {
  prepareResponse,
  get,
  post,
  put,
  delete: del,
};
