const express = require('express'),
crmRouter        = express.Router(),
passport      = require('passport');

var leadRouter  = require('../CRM/Lead/index'),
offerRouter     = require('../CRM/Offer/index'),
usersRouter     = require('../CRM/Users/index'),
configRouter    = require('../CRM/Config/index')

crmRouter.use('/lead', leadRouter);

crmRouter.use('/offer', offerRouter);

crmRouter.use('/users', usersRouter);

crmRouter.use('/config', configRouter);


module.exports = crmRouter;