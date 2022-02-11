const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const EmployeeModel = require('../../models/employee');

const api = supertest(app);

const initialEmployees = [

  {
    date: 1644343944968,
    firstname: 'Taneli',
    lastname: 'Tanhunen',
    email: 'taneli.t@ggmail.fi',
    phone: '06-1231232',
  },
  {
    date: 1644344077746,
    firstname: 'Maarit',
    lastname: 'Mustikka',
    email: 'maarit.maaritm@ggmail.fi',
    phone: '05-7654321',
  }

];

beforeEach(async () => {

  await EmployeeModel.deleteMany({});

  let employeeObject = new EmployeeModel(initialEmployees[0]);
  await employeeObject.save();
  employeeObject = new EmployeeModel(initialEmployees[1]);
  await employeeObject.save();

});

describe('Get employees', () => {

  test('succeeds with status code 200 if the endpoint is valid', async () => {

    await api
      .get('/api/employees')
      .expect(200);

  });

  test('employees are returned as json', async () => {

    await api
      .get('/api/employees')
      .expect('Content-Type', /application\/json/);

  });

  test('return all employees', async () => {

    const response = await api.get('/api/employees');
    expect(response.body).toHaveLength(initialEmployees.length);

  });

  test('a spesific lastname is within the returned employees', async () => {

    const response = await api.get('/api/employees');
    const lastnames = response.body.map(emp => emp.lastname);
    expect(lastnames).toContain('Mustikka');

  });

});

describe('Add new customer', () => {

  test('a valid employee can be added ', async () => {

    const newEmployee = {
      firstname: 'Matti',
      lastname: 'Matikainen',
      email: 'matti.m@ggmail.fi',
      phone: '08-1234123'
    };

    await api
      .post('/api/employees')
      .send(newEmployee)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/employees');
    const firstnames = response.body.map(emp => emp.firstname);

    expect(response.body).toHaveLength(initialEmployees.length + 1);
    expect(firstnames).toContain('Matti');

  });

});

afterAll(() => {
  mongoose.connection.close();
});