const passport      = require('passport'),
mongoose            = require('mongoose'),
makePDF             = require('../pdfmaker/'),
db                  = require('../config/index');

var sendJSONresponse = function(res, status, content) {
    res.status(status).json(content);
}

module.exports.newLead = function(req, res) {
    db.Lead.findOne({leadId: req.body.leadId})
        .then(data => {
            if (data === null) {
                var lead = new db.Lead(req.body);
                lead.save(function(err) { 
                   if (err) { return sendJSONresponse(res, 404, err); }
                   return sendJSONresponse(res, 200, {message: '🤟 Лид успешно создан!'});
                });
            } else {
                return sendJSONresponse(res, 404, {success: false, error: {message: '👯 Лид с таким ID уже существует'}});
            }
        })
        .catch(err=> {
            return sendJSONresponse(res, 404, err);
        })
};

module.exports.newLeadOffer = function(req, res) {
    db.Lead.findOne({leadId: req.body.Lead.leadId})
        .then(data => {
            if (data === null) {
                var lead = new db.Lead(req.body.Lead);
                lead.save(function(err) { 
                   if (err) { return sendJSONresponse(res, 404, err); }
                });

                var offer = new db.Offer(req.body.Offer);
                offer.save(function(err) {
                    if (err) { return sendJSONresponse(res, 404, err); }
                    return sendJSONresponse(res, 200, {message: '🤟 Лид и Предложение успешно созданы!'});
                })
            } else {
                return sendJSONresponse(res, 404, {success: false, error: {message: '👯 Лид с таким ID уже существует'}});
            }
        })
        .catch(err=> {
            return sendJSONresponse(res, 404, err);
        })
}

module.exports.newLeadOfferSent = function(req, res) {
    db.Lead.findOne({leadId: req.body.Lead.leadId})
        .then(data => {
            if (data === null) {
                var lead = new db.Lead(req.body.Lead);
                lead.save(function(err) { 
                   if (err) { return sendJSONresponse(res, 404, err); }
                });

                var offer = new db.Offer(req.body.Offer);
                offer.save(function(err) {
                    if (err) { return sendJSONresponse(res, 404, err); }
                })
                makePDF.makePDF(req.body)
                    .then(data => {
                        return sendJSONresponse(res, 200, {message: '🤟 Лид и Предложение созданы и отправленны!'})
                    });
            } else {
                return sendJSONresponse(res, 404, {success: false, error: {message: '👯 Лид с таким ID уже существует'}});
            }
        })
        .catch(err=> {
            return sendJSONresponse(res, 404, err);
        })
}

module.exports.getLeadInfo = function(req, res) {
    db.Lead.findOne({leadId: req.body.id})
        .then( data => {
            return sendJSONresponse(res, 200, data);
        })
        .catch(err=> {
            return sendJSONresponse(res, 404, err);
        });
}

module.exports.createNewComment = function(req, res) {
    db.Lead.findOneAndUpdate({leadId: req.body.leadId},
        {
            '$push': {comments: [req.body.comment]}}, {new: true})
            .then(data => {
                return sendJSONresponse(res, 200, data);
            }, err => {
                return sendJSONresponse(res, 404, err);
            })
}

module.exports.createNewTask = function(req, res) {
    db.Lead.findOneAndUpdate({leadId: req.body.leadId},
        {
            '$push': {tasks: [req.body.task]}}, {new: true})
            .then(data => {
                return sendJSONresponse(res, 200, data);
            }, err => {
                return sendJSONresponse(res, 404, err);
            })
}

module.exports.changeStatus = function(req, res) {
    db.Lead.findOneAndUpdate({'leadId': req.body.leadId, 'tasks._id': req.body.changedTask._id},
        {$set: {'tasks.$.status' : 'finished', 'tasks.$.finishedDate' : (new Date).toISOString() } }, {new: true}
        ).then(data => {
            return sendJSONresponse(res, 200, data);
        }, err => {
            return sendJSONresponse(res, 404, err);
        })
}

module.exports.getAllOffersFromLead = function(req, res) {
    db.Offer.find({leadLink: req.body.leadLink})
        .then( data => {
            return sendJSONresponse(res, 200, data);
        })
        .catch(err=> {
            return sendJSONresponse(res, 404, err);
        });
}

module.exports.changeLeadStatus = function(req, res) {
    db.Lead.findOneAndUpdate({leadId: req.body.leadId},
        {$set: {'leadStatus': req.body.leadStatus}})
        .then( data => {
            return sendJSONresponse(res, 200, {message: '🤟 Статус изменен!'});
        }, err => {
            return sendJSONresponse(res, 404, err);
        })
}

module.exports.saveLeadChanges = function(req, res) {
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
            return sendJSONresponse(res, 200, {message: '🤟 Лид изменен!'});
        }, err => {
            return sendJSONresponse(res, 404, err);
        })
}

module.exports.saveOfferChanges = function(req, res) {
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
                    return sendJSONresponse(res, 200, {message: '🤟 Предложение и расчеты изменены!'});
                }, err => {
                    return sendJSONresponse(res, 404, err);
                })
}

module.exports.saveOfferDetailChanges = function(req, res) {
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
            return sendJSONresponse(res, 200, {message: '🤟 Расчеты изменены!'});
        }, err => {
            return sendJSONresponse(res, 404, err);
        })
}

module.exports.sentOffer = function(req, res) {
    db.Lead.findOne({leadId: req.body.leadLink})
        .then(data => {
            console.log(data.contactEmail);
            makePDF.makePDF({
                Lead: data,
                Offer: req.body
            })
                .then(data => {
                    return sendJSONresponse(res, 200, {message: '🤟 Предложение отправлено!'});
                })
                .catch(err=> {
                    return sendJSONresponse(res, 404, err);
                });
        });
}

module.exports.getLeadList = function(req, res) {
    db.Lead.find({})
        .then(data => {
            return sendJSONresponse(res, 200, data);
        })
        .catch(err=> {
            return sendJSONresponse(res, 404, err);
        });
}