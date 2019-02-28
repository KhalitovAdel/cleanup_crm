const express = require('express'),
router        = express.Router(),
makePDF       = require('../pdfmaker/');

var db = require('../config/index'),
parser = require('../pageparser/index');

router.post('/pars2gis', async function(req, res) {
    res.send( await parser.pars2gis(req.body.link) );
});

router.post('/newLead', function(req, res) {
    db.Lead.findOne({leadId: req.body.leadId})
        .then(data => {
            if (data === null) {
                var lead = new db.Lead(req.body);
                lead.save(function(err) { 
                   if (err) { return console.log('Save Lead error ', err); }
                   return res.send({message: '🤟 Лид успешно создан!'}).status(200);
                });
            } else {
                return res.send({success: false, error: {message: '👯 Лид с таким ID уже существует'}}).status(500);
            }
        })
        .catch(err=> {
            return res.send({success: false, error: {message: err}}).status(500);
        })
});

router.post('/newLeadOffer', function(req, res) {
    db.Lead.findOne({leadId: req.body.Lead.leadId})
        .then(data => {
            if (data === null) {
                var lead = new db.Lead(req.body.Lead);
                lead.save(function(err) { 
                   if (err) { return console.log('Save Lead error ', err); }
                });

                var offer = new db.Offer(req.body.Offer);
                offer.save(function(err) {
                    if (err) { return console.log('Save Lead error ', err); }
                    console.log('Offer added to db');
                    return res.send({message: '🤟 Лид и Предложение успешно созданы!'}).status(200);
                })
            } else {
                return res.send({success: false, error: {message: '👯 Лид с таким ID уже существует'}}).status(500);
            }
        })
        .catch(err=> {
            return res.send({success: false, error: {message: err}}).status(500);
        })
    
});

router.post('/newLeadOfferSend', function(req, res) {
    db.Lead.findOne({leadId: req.body.Lead.leadId})
        .then(data => {
            if (data === null) {
                var lead = new db.Lead(req.body.Lead);
                lead.save(function(err) { 
                   if (err) { return console.log('Save Lead error ', err); }
                });

                var offer = new db.Offer(req.body.Offer);
                offer.save(function(err) {
                    if (err) { return console.log('Save Lead error ', err); }
                })
                makePDF.makePDF(req.body)
                    .then(data => {
                        return res.send({message: '🤟 Лид и Предложение созданы и отправленны!'}).status(200);
                    });
            } else {
                return res.send({success: false, error: {message: '👯 Лид с таким ID уже существует'}}).status(500);
            }
        })
        .catch(err=> {
            return res.send({success: false, error: {message: err}}).status(500);
        })
    
});

router.post('/getLeadInfo', function(req, res) {
    db.Lead.findOne({leadId: req.body.id})
        .then( data => {
            res.send(data).status(200);
        })
        .catch(err=> {
            console.log('Get all Leads error: ' + err);
        });
})

router.post('/createNewComment', function(req, res) {
    db.Lead.findOneAndUpdate({leadId: req.body.leadId},
        {
            '$push': {comments: [req.body.comment]}}, {new: true})
            .then(data => {
                res.send(data).status(200);
            }, err => {
                return res.send({success: false, error: {message: err}}).status(500);
            })
});

router.post('/createNewTask', function(req, res) {
    db.Lead.findOneAndUpdate({leadId: req.body.leadId},
        {
            '$push': {tasks: [req.body.task]}}, {new: true})
            .then(data => {
                res.send(data).status(200);
            }, err => {
                return res.send({success: false, error: {message: err}}).status(500);
            })
});

router.post('/changeStatus', function(req, res) {
    db.Lead.findOneAndUpdate({'leadId': req.body.leadId, 'tasks._id': req.body.changedTask._id},
        {$set: {'tasks.$.status' : 'finished', 'tasks.$.finishedDate' : (new Date).toISOString() } }, {new: true}
        ).then(data => {
            res.send(data).status(200);
        }, err => {
            return res.send({success: false, error: {message: err}}).status(500);
        })
});


router.post('/getAllOffersFromLead', function(req, res) {
    db.Offer.find({leadLink: req.body.leadLink})
        .then( data => {
            res.send(data).status(200);
        })
        .catch(err=> {
            return res.send({success: false, error: {message: err}}).status(500);
        });
});  

router.get('/getLeadList', function(req, res) {
    db.Lead.find({})
        .then(data => {
            res.send(data).status(200)
        })
        .catch(err=> {
            return res.send({success: false, error: {message: err}}).status(500);
        });
});
module.exports = router;