/**
 * Module dependencies
 */
const config = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');
const employeesRouter = require('./routes/employees');
const morgan = require('morgan');
const { errorHandler, unknownEndpoint } = require('./utils/middleware');
const cors = require('cors');

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

/**
 * Middlewares for handling request/response objects
 */
app.use(express.json());
app.use(express.static('build'));
app.use(cors());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'));
}

/**
 * Routes
 */

// Route for testing
app.get('/ping', (req, res) => {
  res.end('pong');
});

app.use('/api/employees', employeesRouter);

/**
 * Middlewares for handling errors
 */
app.use(errorHandler);
app.use(unknownEndpoint);

module.exports = app;