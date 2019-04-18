const express = require('express'),
leadRouter        = express.Router(),
passport      = require('passport');

var ctrlLead = require('../../../controllers/lead'),
ctrlAuth        = require('../../../controllers/auth');


leadRouter.post('/new', ctrlAuth.mustAuthenticatedMw, ctrlLead.newLead);
leadRouter.post('/getLead', ctrlAuth.mustAuthenticatedMw, ctrlLead.getLeadInfo);
leadRouter.post('/newComment', ctrlAuth.mustAuthenticatedMw, ctrlLead.createNewComment);
leadRouter.post('/newTask', ctrlAuth.mustAuthenticatedMw, ctrlLead.createNewTask);
leadRouter.post('/changeTaskStatus', ctrlAuth.mustAuthenticatedMw, ctrlLead.changeStatus); // put
leadRouter.post('/changeLeadStatus', ctrlAuth.mustAuthenticatedMw, ctrlLead.changeLeadStatus); //put
leadRouter.post('/saveLeadChanges', ctrlAuth.mustAuthenticatedMw, ctrlLead.saveLeadChanges); //put
leadRouter.post('/newLeadOffer', ctrlAuth.mustAuthenticatedMw, ctrlLead.newLeadOffer); //Как то переделать
leadRouter.post('/newLeadOfferSend', ctrlAuth.mustAuthenticatedMw, ctrlLead.newLeadOfferSent); //Как то переделать
leadRouter.post('/getAllOffersFromLead', ctrlAuth.mustAuthenticatedMw, ctrlLead.getAllOffersFromLead); //Как то переделать
leadRouter.post('/createTestKP', ctrlAuth.mustAuthenticatedMw, ctrlLead.createkp); // Как то переделать

leadRouter.get('/getLeadList', ctrlAuth.mustAuthenticatedMw, ctrlLead.getLeadList);

module.exports = leadRouter;