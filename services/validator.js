class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

const validator = (body) => {

  if (typeof(body) !== 'object') {
    throw new ValidationError('Invalid data.');
  }

  if (Object.keys(body).length > 4) {
    throw new ValidationError('Too many properties');
  }

  Object.values(body).forEach(value => {
    if (typeof(value) !== 'string') {
      throw new ValidationError('Data is not in string format');
    }
  });

};

module.exports = { validator };