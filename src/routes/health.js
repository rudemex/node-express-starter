module.exports = (app, appConfig) => {
  const { context } = appConfig['server'];

  app.get(encodeURI(`${context}/health`), (req, res) => {
    res.status(200).json({ status: 'UP' });
  });
};
