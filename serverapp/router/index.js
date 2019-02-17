const express = require('express'),
router        = express.Router(),
makePDF       = require('../pdfmaker/');

var db = require('../config/index'),
parser = require('../pageparser/index');

router.post('/makePDF', function(req, res) {
    makePDF.makePDF(req.body);
    res.send({ status: 'SUCCESS' });
});

router.post('/pars2gis', async function(req, res) {
    res.send( await parser.pars2gis(req.body.link) );
});

router.post('/newLead', function(req, res) {
    var lead = new db.Lead();// Перед созданием проверить может существует
    for (let x in req.body) {
        lead[x] = req.body[x];//Если req.body[x] массив элементов, то пушить массивом
    }
    lead.save(function(err) { 
       if (err) { return console.log('Save Lead error ', err); }
       res.status(200);//Обработать регистрацию
    });
});

router.post('/getLeadInfo', function(req, res) {
    db.Lead.findOne({_id: req.body._id}).then(function(leads) {
        res.send(leads);
    });
});

router.get('/getLeadList', function(req, res) {
    db.Lead.find({}).then(function(leads) {
        res.send(leads);
    });
});

module.exports = router;