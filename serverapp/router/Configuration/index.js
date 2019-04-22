const express = require('express'),
configurationRouter        = express.Router(),
passport      = require('passport');

var ctrlAuth        = require('../../../controllers/auth');

configurationRouter.post('/register', ctrlAuth.register);

module.exports = configurationRouter;