const express = require('express'),
usersRouter        = express.Router(),
passport      = require('passport');

var ctrlEmployee    = require('../../../controllers/employee'),
ctrlAuth            = require('../../../controllers/auth');

usersRouter.post('/createNewEmployee', ctrlAuth.mustAuthenticatedMw, ctrlEmployee.createNewEmployee);
usersRouter.get('/getEmployeeList', ctrlAuth.mustAuthenticatedMw, ctrlEmployee.getEmployeeList);

module.exports = usersRouter;