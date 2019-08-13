var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var router = require('./routes');
const Store = require('./services/store.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Attach the project data to req so it can be
// accessed in the router
(async () => {
  const store = await Store();
  app.set('projectStore', store);
})();

app.use('/api', router);

module.exports = app;
