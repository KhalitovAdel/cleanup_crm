const express = require('express'),
router        = express.Router(),
makePDF       = require('../pdfmaker/');

var db      = require('../config/index'),
parser      = require('../pageparser/index'),
passport    = require('../passport/index');

var ctrlAuth    = require('../controllers/auth'),
    ctrlLead    = require('../controllers/lead');

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login); 

router.post('/pars2gis', async function(req, res) {
    res.send( await parser.pars2gis(req.body.link) );
});

router.post('/newLead', ctrlLead.newLead);
router.post('/newLeadOffer', ctrlLead.newLeadOffer);
router.post('/newLeadOfferSend', ctrlLead.newLeadOfferSent);
router.post('/getLeadInfo', ctrlLead.getLeadInfo);
router.post('/createNewComment', ctrlLead.createNewComment);
router.post('/createNewTask', ctrlLead.createNewTask);
router.post('/changeStatus', ctrlLead.changeStatus);
router.post('/getAllOffersFromLead', ctrlLead.getAllOffersFromLead);  
router.post('/changeLeadStatus', ctrlLead.changeLeadStatus);
router.post('/saveLeadChanges', ctrlLead.saveLeadChanges);
router.post('/saveOfferChanges', ctrlLead.saveOfferChanges);
router.post('/saveOfferDetailChanges', ctrlLead.saveOfferDetailChanges);
router.post('/sentOffer', ctrlLead.sentOffer);
router.post('/newOffer', ctrlLead.newOffer);
router.post('/deleteOffer', ctrlLead.deleteOffer)

router.get('/getLeadList', ctrlLead.getLeadList);

module.exports = router;