/**
 * Module dependencies
 */
const employeesRouter = require('express').Router();
const EmployeeModel = require('../models/employee');

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

module.exports = employeesRouter;