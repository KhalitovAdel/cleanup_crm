const express = require('express'),
publicRouter        = express.Router(),
passport      = require('passport');

var ctrlAuth        = require('../../controllers/auth'),
ctrlClient          = require('../../controllers/client')

publicRouter.post('/invite', ctrlAuth.invite);

publicRouter.post('/getUser', ctrlAuth.getUser);

publicRouter.post('/sentOfferByClient', ctrlClient.b2bOffer);

publicRouter.put('/finishUserRegistration', ctrlAuth.finishUserRegistration);

publicRouter.get('/hasRole', ctrlAuth.hasRole);

module.exports = publicRouter;