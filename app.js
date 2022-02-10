const express = require('express');
const app = express();

app.get('/ping', (req, res) => {
  res.end('pong');
});

module.exports = app;