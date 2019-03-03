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

router.post('/changeLeadStatus', function (req, res) {
    db.Lead.findOneAndUpdate({leadId: req.body.leadId},
        {$set: {'leadStatus': req.body.leadStatus}})
        .then( data => {
            return res.send({message: '🤟 Статус изменен!'}).status(200);
        }, err => {
            return res.send({success: false, error: {message: err}}).status(500);
        })
});

router.post('/saveLeadChanges', function(req, res) {
    db.Lead.findOneAndUpdate({leadId: req.body.leadId},
        {$set: {'firmName': req.body.firmName,
                'contactPhones': req.body.contactPhones,
                'contactPhones': req.body.contactPhones,
                'contactEmail': req.body.contactEmail,
                'address': req.body.address,
                'contactName': req.body.contactName,
                'position': req.body.position,
                'lprsName': req.body.lprsName,
        }})
        .then( data => {
            return res.send({message: '🤟 Лид изменен!'}).status(200);
        }, err => {
            return res.send({success: false, error: {message: err}}).status(500);
        })
});

router.post('/saveOfferChanges', function(req, res) {
    db.Offer.findOneAndUpdate({_id: req.body._id},
        {$set: {'area': req.body.area,
                'regular': req.body.regular,
                'time': req.body.time,
                'twice': req.body.twice,
                'details.fot': req.body.details.fot,
                'details.itog': req.body.details.itog,
                'details.itogMaterial': req.body.details.itogMaterial,
                'details.managerWage': req.body.details.managerWage,
                'details.material': req.body.details.material,
                'details.profit': req.body.details.profit,
                'details.tinkoffCommission': req.body.details.tinkoffCommission,
                'details.windowFond': req.body.details.windowFond,
                }})
                .then( data => {
                    return res.send({message: '🤟 Предложение и расчеты изменены!'}).status(200);
                }, err => {
                    console.log(err)
                    return res.send({success: false, error: {message: err}}).status(500);
                })
});

router.post('/saveOfferDetailChanges', function(req, res) {
    db.Offer.findOneAndUpdate({_id: req.body.data._id},
        {$set: {'details.fot': req.body.data.details.fot,
                'details.itog': req.body.data.details.itog,
                'details.itogMaterial': req.body.data.details.itogMaterial,
                'details.managerWage': req.body.data.details.managerWage,
                'details.material': req.body.data.details.material,
                'details.profit': req.body.data.details.profit,
                'details.tinkoffCommission': req.body.data.details.tinkoffCommission,
                'details.windowFond': req.body.data.details.windowFond,
        }})
        .then( data => {
            return res.send({message: '🤟 Расчеты изменены!'}).status(200);
        }, err => {
            return res.send({success: false, error: {message: err}}).status(500);
        })
});

router.get('/getLeadList', function(req, res) {
    db.Lead.find({})
        .then(data => {
            res.send(data).status(200)
        })
        .catch(err=> {
            return res.send({success: false, error: {message: err}}).status(200);
        });
});
module.exports = router;