const appRouter = (app, appConfig, version) => {
  // Routes
  require('./health')(app, appConfig);
  require('./character')(app, appConfig);

  app.get(encodeURI('/'), (req, res) => {
    res.status(200).send(`Welcome to server express - v${encodeURI(version)}`);
  });
};

module.exports = appRouter;
