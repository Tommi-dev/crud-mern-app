/**
 * Module dependencies
 */
const employeesRouter = require('express').Router();

/**
 * Get all employees
 */
employeesRouter.get('/', async (req, res) => {

  res.status(200).end();

});

module.exports = employeesRouter;