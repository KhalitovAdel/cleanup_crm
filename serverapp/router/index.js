const express = require('express'),
router        = express.Router(),
passport      = require('passport');

var acl       = require('../apps/acl_roles/rols');

var ctrlClient          = require('../controllers/client'),
    crmRouter           = require('../router/CRM/index'),
    configurationRouter = require('../router/Configuration/index'),
    publicRouter        = require('../router/Public/index')
    employessRouter     = require('../router/Employess/index');

//router.post('/sentOfferByClient', ctrlClient.b2bOffer); //???????????

router.use('/crm', checkForPermissions(), crmRouter);
router.use('/configuration', checkForPermissions(), configurationRouter);
router.use('/employess', checkForPermissions(), employessRouter);
router.use('/public', publicRouter);

function checkForPermissions() {
        
    return (req, res, next) => {
        const userId = getUserId(req);
        return acl.then(acl=> {
            acl.middleware(2, userId);
            next();
        })
    }
   
}

function getUserId(req) {
    if (req.user) {
        return req.session.passport.user;
    } 
}

module.exports = router;