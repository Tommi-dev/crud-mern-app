/**
 * Module dependencies
 */
const employeesRouter = require('express').Router();
const EmployeeModel = require('../models/employee');
const { validator } = require('../services/validator');

/**
 * Get all employees
 */
employeesRouter.get('/', async (req, res) => {

  try {

    const employees = await EmployeeModel.find();
    res.send(employees);

  } catch(err) {

    return res.status(500).json({ message: err.message });

  }

});

/**
 * Add new employee
 */
employeesRouter.post('/', async (req, res, next) => {

  try {

    const body = req.body;

    validator(body);

    const newEmployee = new EmployeeModel({

      date: Date.now(),
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      phone: body.phone

    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json( savedEmployee );

  } catch(err) {
    next(err);
  }

});

module.exports = employeesRouter;