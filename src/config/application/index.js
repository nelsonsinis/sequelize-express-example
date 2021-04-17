const express = require('express');
const { middleware } = require('lowe');
const routes = require('./routes');

const app = express();

app.use(middleware('tiny'));
app.use(express.json());
app.use(routes);

module.exports = app;
