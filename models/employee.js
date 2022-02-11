/**
 * Module dependencies
 */
const mongoose = require('mongoose');

/**
 * Schema that tells the database how to store data
 */
const employeeShema = new mongoose.Schema({

  date: {
    type: Number,
    required: true
  },
  firstname: {
    type: String,
    required: true,
    minlength: 2
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    minlength: 5
  },
  phone: {
    type: String,
    required: true,
    minlength: 1
  }

});

/**
 * Converting data from a database to the desired format
 */
employeeShema.set('toJSON', {

  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  }

});

/**
 * Converting a schema to a model and exporting module
 */
module.exports = mongoose('Employee', employeeShema);