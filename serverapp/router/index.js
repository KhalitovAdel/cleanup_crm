const express = require('express'),
router        = express.Router(),
passport      = require('passport');

var db      = require('../config/index'),
parser      = require('../pageparser/index');

var ctrlAuth    = require('../controllers/auth'),
    ctrlLead    = require('../controllers/lead'),
    ctrlClient  = require('../controllers/client'),
    ctrlConfig  = require('../controllers/config'),
    ctrlEmployee  = require('../controllers/employee');

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login); 

router.post('/sentOfferByClient', ctrlClient.b2bOffer);


router.post('/pars2gis', ctrlAuth.mustAuthenticatedMw, async function(req, res) {
    res.send( await parser.pars2gis(req.body.link) );
});

router.post('/newLead', ctrlAuth.mustAuthenticatedMw, ctrlLead.newLead);
router.post('/newLeadOffer', ctrlAuth.mustAuthenticatedMw, ctrlLead.newLeadOffer);
router.post('/newLeadOfferSend', ctrlAuth.mustAuthenticatedMw, ctrlLead.newLeadOfferSent);
router.post('/getLeadInfo', ctrlAuth.mustAuthenticatedMw, ctrlLead.getLeadInfo);
router.post('/createNewComment', ctrlAuth.mustAuthenticatedMw, ctrlLead.createNewComment);
router.post('/createNewTask', ctrlAuth.mustAuthenticatedMw, ctrlLead.createNewTask);
router.post('/changeStatus', ctrlAuth.mustAuthenticatedMw, ctrlLead.changeStatus);
router.post('/getAllOffersFromLead', ctrlAuth.mustAuthenticatedMw, ctrlLead.getAllOffersFromLead);  
router.post('/changeLeadStatus', ctrlAuth.mustAuthenticatedMw, ctrlLead.changeLeadStatus);
router.post('/saveLeadChanges', ctrlAuth.mustAuthenticatedMw, ctrlLead.saveLeadChanges);
router.post('/saveOfferChanges', ctrlAuth.mustAuthenticatedMw, ctrlLead.saveOfferChanges);
router.post('/saveOfferDetailChanges', ctrlAuth.mustAuthenticatedMw, ctrlLead.saveOfferDetailChanges);
router.post('/sentOffer', ctrlAuth.mustAuthenticatedMw, ctrlLead.sentOffer);
router.post('/newOffer', ctrlAuth.mustAuthenticatedMw, ctrlLead.newOffer);
router.post('/deleteOffer', ctrlAuth.mustAuthenticatedMw, ctrlLead.deleteOffer);
router.post('/changeOfferDetailsToAll', ctrlAuth.mustAuthenticatedMw, ctrlLead.changeOfferDetailsToAll);

router.post('/createNewEmployee', ctrlAuth.mustAuthenticatedMw, ctrlEmployee.createNewEmployee);


router.post('/createTestKP', ctrlAuth.mustAuthenticatedMw, ctrlLead.createkp);

router.post('/createNewMaterial', ctrlAuth.mustAuthenticatedMw, ctrlConfig.createNewMaterial);

router.get('/getEmployeeList', ctrlAuth.mustAuthenticatedMw, ctrlEmployee.getEmployeeList);
router.get('/getMaterialList', ctrlAuth.mustAuthenticatedMw, ctrlConfig.getMaterialList);
router.get('/getLeadList', ctrlAuth.mustAuthenticatedMw, ctrlLead.getLeadList);
router.get('/getalloffers', ctrlAuth.mustAuthenticatedMw, ctrlLead.getAllOffers)
router.get('/detect', function( req, res) {
    if ( req.isAuthenticated() ) {
        res.status(200).send({ detect: true })
    } else {
        res.status(401).send({ detect: false })
    }
})

module.exports = router;