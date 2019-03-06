const express = require('express'),
router        = express.Router(),
jwt           = require('express-jwt'),
makePDF       = require('../pdfmaker/');

var db      = require('../config/index'),
parser      = require('../pageparser/index'),
passport    = require('../passport/index');

var ctrlAuth    = require('../controllers/auth'),
    ctrlLead    = require('../controllers/lead');

var auth = jwt({ //запросы толко для аутентифицированных https://www.youtube.com/watch?v=6or8Fj-6NaE
    secret: 'thisIsSecret',
    userProperty: 'payload'
})

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

router.get('/getLeadList', ctrlLead.getLeadList);

module.exports = router;