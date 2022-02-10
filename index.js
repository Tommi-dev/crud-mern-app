/**
 * Module dependencies
 */
const http = require('http');
const config = require('./utils/config');
const app = require('./app');

/**
 * Create http server
 */
const server = http.createServer(app);

// Listener to the specified port
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});