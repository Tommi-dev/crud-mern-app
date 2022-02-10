const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);

describe('Get ping pong', () => {

  test('succeeds with status code 200 if the endpoint is valid', async () => {
    await api
      .get('/ping')
      .expect(200);
  });

});