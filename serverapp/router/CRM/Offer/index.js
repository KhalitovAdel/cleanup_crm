const express = require('express'),
offerRouter        = express.Router(),
passport      = require('passport');

var ctrlLead    = require('../../../controllers/lead'), //Разделить на оффер
ctrlAuth        = require('../../../controllers/auth');
offerRouter.post('/new', ctrlAuth.mustAuthenticatedMw, ctrlLead.newOffer);
offerRouter.post('/change', ctrlAuth.mustAuthenticatedMw, ctrlLead.saveOfferChanges); //put
offerRouter.post('/changeDetails', ctrlAuth.mustAuthenticatedMw, ctrlLead.saveOfferDetailChanges); //put
offerRouter.post('/send', ctrlAuth.mustAuthenticatedMw, ctrlLead.sentOffer);
offerRouter.post('/delete', ctrlAuth.mustAuthenticatedMw, ctrlLead.deleteOffer); //del

//offerRouter.post('/changeOfferDetailsToAll', ctrlAuth.mustAuthenticatedMw, ctrlLead.changeOfferDetailsToAll);

offerRouter.get('/getAllOffers', ctrlAuth.mustAuthenticatedMw, ctrlLead.getAllOffers)

module.exports = offerRouter;