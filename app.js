/**
 * Module dependencies
 */
const config = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');

// Express app
const app = express();

/**
 * MongoDB connection
 */
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  });

// Route for testing
app.get('/ping', (req, res) => {
  res.end('pong');
});

module.exports = app;