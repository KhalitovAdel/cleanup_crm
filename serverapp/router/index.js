const express = require('express'),
router        = express.Router(),
passport      = require('passport');

var db = require('../config/index');

var ctrlClient  = require('../controllers/client'),
    crmRouter   = require('../router/CRM/index'),
    configurationRouter = require('../router/Configuration/index');



router.post('/sentOfferByClient', ctrlClient.b2bOffer); //???????????

router.use('/crm', checkForPermissions(), crmRouter);
router.use('/configuration', checkForPermissions(), configurationRouter);

function checkForPermissions() {
    return (req, res, next) => {
        const userId = getUserId(req);
        db.acl.middleware(2, userId);
        next();
    }
   
}

function getUserId(req) {
    if (req.user) {
        return req.session.passport.user;
    }
}

module.exports = router;