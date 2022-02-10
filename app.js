const config = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  });

app.get('/ping', (req, res) => {
  res.end('pong');
});

module.exports = app;