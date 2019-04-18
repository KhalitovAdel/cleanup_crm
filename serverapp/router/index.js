const express = require('express'),
router        = express.Router(),
passport      = require('passport');

var ctrlClient  = require('../controllers/client'),
    crmRouter   = require('../router/CRM/index');

router.post('/sentOfferByClient', ctrlClient.b2bOffer); //???????????

router.use('crm', crmRouter);

module.exports = router;