const express = require('express'),
router        = express.Router(),
makePDF       = require('../pdfmaker/');

var db = require('../config/index');

router.post('/makePDF', function(req, res) {
    makePDF.makePDF(req.body);
    res.send({ status: 'SUCCESS' });
});

router.post('/newLead', function(req, res) {
    var lead = new db.Lead();
    lead.name = req.body.name;

    lead.save(function(err) { 
       if (err) { return console.log('Save Lead error ', err); }
       res.status(200);
    });
});

module.exports = router;