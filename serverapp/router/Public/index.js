const express = require('express'),
publicRouter        = express.Router(),
passport      = require('passport');

var ctrlAuth        = require('../../controllers/auth');

publicRouter.post('/invite', ctrlAuth.invite);

publicRouter.post('/getUser', ctrlAuth.getUser);

publicRouter.put('/finishUserRegistration', ctrlAuth.finishUserRegistration);
module.exports = publicRouter;