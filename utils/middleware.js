const errorHandler = (error, request, response, next) => {

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {

  response.status(404).send('unkknown endpoint');

};

module.exports = { errorHandler, unknownEndpoint };