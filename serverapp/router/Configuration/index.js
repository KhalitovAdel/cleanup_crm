const express = require('express'),
configurationRouter        = express.Router(),
passport      = require('passport');

var ctrlAuth        = require('../../controllers/auth');

configurationRouter.post('/invite', ctrlAuth.invite);

module.exports = configurationRouter;