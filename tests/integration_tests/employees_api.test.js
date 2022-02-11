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

beforeEach( async () => {

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

});

afterAll(() => {
  mongoose.connection.close();
});