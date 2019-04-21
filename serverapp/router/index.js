const express = require('express'),
router        = express.Router(),
passport      = require('passport');

var db = require('../config/index');

var ctrlClient  = require('../controllers/client'),
    crmRouter   = require('../router/CRM/index');



router.post('/sentOfferByClient', ctrlClient.b2bOffer); //???????????

router.use('/crm', checkForPermissions(), crmRouter);

function checkForPermissions() {
    return (req, res, next) => {
        console.log('Я работаю')
        const userId = getUserId(req);
        db.acl.middleware(2, userId);
        next();
    }
   
}

function getUserId(req) {
    if (req.user) {
        console.log(req.session.passport.user)
        return req.session.passport.user;
    }
}

module.exports = router;