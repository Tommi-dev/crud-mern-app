/**
 * Module dependencies
 */
const http = require('http');
const config = require('./utils/config');

/**
 * Create http server
 */
const server = http.createServer();

// Listener to the specified port
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});