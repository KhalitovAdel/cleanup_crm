const express = require('express'),
employessRouter        = express.Router(),
passport      = require('passport');

var ctrlEmployee    = require('../../controllers/employee');

employessRouter.post('/getEmploye', ctrlEmployee.getEmploye);

module.exports = employessRouter;