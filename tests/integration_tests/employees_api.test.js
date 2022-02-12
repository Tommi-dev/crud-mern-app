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

  test('fails with status code 400 if the resources are invalid', async () => {

    const newEmployee = {
      firstname: 'Teppo'
    };

    await api
      .post('/api/employees')
      .send(newEmployee)
      .expect(400);

    const response = await api.get('/api/employees');

    expect(response.body).toHaveLength(initialEmployees.length);
  });

  test('fails with status code 400 if the resources are invalid format', async () => {

    const newEmployee = {
      firstname: 56,
      lastname: 'Terhonen',
      email: '56.t@ggmail.fi',
      phone: '04-1234123'
    };

    await api
      .post('/api/employees')
      .send(newEmployee)
      .expect(400);

    const response = await api.get('/api/employees');

    expect(response.body).toHaveLength(initialEmployees.length);
  });

  test('fails with status code 400 if the resources are invalid format', async () => {

    const newEmployee = {
      firstmmmm: 'Teppo',
      lastname: 'Terhonen',
      email: '56.t@ggmail.fi',
      phone: '04-1234123'
    };

    await api
      .post('/api/employees')
      .send(newEmployee)
      .expect(400);

    const response = await api.get('/api/employees');

    expect(response.body).toHaveLength(initialEmployees.length);
  });

  test('fails with status code 400 if too many properties', async () => {

    const newEmployee = {
      firstname: 'Teppo',
      lastname: 'Terhonen',
      email: '56.t@ggmail.fi',
      phone: '04-1234123',
      address: 'Wall Street'
    };

    await api
      .post('/api/employees')
      .send(newEmployee)
      .expect(400);

    const response = await api.get('/api/employees');

    expect(response.body).toHaveLength(initialEmployees.length);
  });

});

describe('Delete employee', () => {

  test('employee deleted if id is valid', async () => {

    const employeesAtStart = await api.get('/api/employees');

    const employeeToDelete = employeesAtStart.body[0];

    await api
      .delete(`/api/employees/${employeeToDelete.id}`)
      .expect(204);

    const employeesAtEnd = await api.get('/api/employees');

    expect(employeesAtEnd.body).toHaveLength(
      employeesAtStart.body.length - 1
    );

    const lastnames = employeesAtEnd.body.map(emp => emp.lastname);

    expect(lastnames).not.toContain(employeeToDelete.lastname);

  });

  test('employee with invalid id is not deleted', async () => {

    const employeesAtStart = await api.get('/api/employees');

    const employeeToDelete = employeesAtStart.body[0];

    await api
      .delete('/api/employees/helloworld')
      .expect(500);

    const employeesAtEnd = await api.get('/api/employees');

    expect(employeesAtEnd.body).toHaveLength(
      employeesAtStart.body.length
    );

    const lastnames = employeesAtEnd.body.map(emp => emp.lastname);

    expect(lastnames).toContain(employeeToDelete.lastname);

  });

});

describe('Update employee', () => {

  test('employee updated if id is valid', async () => {

    const newEmployeeData = {
      email: 'myNewEmail@email.fi'
    };

    const employeesAtStart = await api.get('/api/employees');

    const employeeToUpdate = employeesAtStart.body[0];

    await api
      .put(`/api/employees/${employeeToUpdate.id}`)
      .send(newEmployeeData)
      .expect(200);

    const employeesAtEnd = await api.get('/api/employees');
    const emails = employeesAtEnd.body.map(emp => emp.email);
    expect(emails).toContain(newEmployeeData.email);

  });

});

afterAll(() => {
  mongoose.connection.close();
});