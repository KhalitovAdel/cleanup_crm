const passport      = require('passport'),
mongoose            = require('mongoose'),
makePDF             = require('../pdfmaker/index.1'),
db                  = require('../config/index'),
Lead                = require('../models/lead');

var sendJSONresponse = function(res, status, content) {
    res.status(status).json(content);
}

module.exports.newLead = function(req, res) {
    Lead.findOne({leadId: req.body.leadId})
        .then(data => {
            if (data === null) {
                var lead = new Lead(req.body);
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
    Lead.findOne({leadId: req.body.Lead.leadId})
        .then(data => {
            if (data === null) {
                var lead = new Lead(req.body.Lead);
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
    Lead.findOne({leadId: req.body.Lead.leadId})
        .then(data => {
            if (data === null) {
                var lead = new Lead(req.body.Lead);
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
module.exports.createkp = function(req, res) {
    makePDF.makePDF(req.body)
        .then(data => {
            console.log(data)
            //return sendJSONresponse(res, 200, {message: 'Успешно'})
        })
        .catch(err=> {
            console.log(err)
        });
}

module.exports.getLeadInfo = function(req, res) {
    Lead.findOne({leadId: req.body.id})
        .then( data => {
            return sendJSONresponse(res, 200, data);
        })
        .catch(err=> {
            return sendJSONresponse(res, 404, err);
        });
}

module.exports.createNewComment = function(req, res) {
    Lead.findOneAndUpdate({leadId: req.body.leadId},
        {
            '$push': {comments: [req.body.comment]}}, {new: true})
            .then(data => {
                return sendJSONresponse(res, 200, data);
            }, err => {
                return sendJSONresponse(res, 404, err);
            })
}

module.exports.createNewTask = function(req, res) {
    Lead.findOneAndUpdate({leadId: req.body.leadId},
        {
            '$push': {tasks: [req.body.task]}}, {new: true})
            .then(data => {
                return sendJSONresponse(res, 200, data);
            }, err => {
                return sendJSONresponse(res, 404, err);
            })
}

module.exports.changeStatus = function(req, res) {
    Lead.findOneAndUpdate({'leadId': req.body.leadId, 'tasks._id': req.body.changedTask._id},
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
    Lead.findOneAndUpdate({leadId: req.body.leadId},
        {$set: {'leadStatus': req.body.leadStatus}})
        .then( data => {
            return sendJSONresponse(res, 200, {message: '🤟 Статус изменен!'});
        }, err => {
            return sendJSONresponse(res, 404, err);
        })
}

module.exports.saveLeadChanges = function(req, res) {
    Lead.findOneAndUpdate({leadId: req.body.leadId},
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
    Lead.findOne({leadId: req.body.leadLink})
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
    Lead.find({})
        .then(data => {
            return sendJSONresponse(res, 200, data);
        })
        .catch(err=> {
            return sendJSONresponse(res, 404, err);
        });
}

module.exports.newOffer = function(req, res) {
    var offer = new db.Offer(req.body);
    offer.save(function(err) {
        if(err) {
            sendJSONresponse(res, 404, err)
        } else {
            sendJSONresponse(res, 200, {
                message: '🤟 Предложение создано!'
            })
        }
    });
}

module.exports.deleteOffer = function(req, res) {
    db.Offer.findByIdAndRemove(req.body._id)
        .then(data => {
            return sendJSONresponse(res, 200, {
                message: '🤟 Предложение удалено!'
            });
        })
        .catch(err=> {
            return sendJSONresponse(res, 404, err);
        });
}

module.exports.getAllOffers = function(req, res) {
    db.Offer.find({})
        .then(data=> {
            res.send(data).status(200);
        })
        .catch(err=> {
            return sendJSONresponse(res, 404, err);
        });
}

module.exports.changeOfferDetailsToAll = function(req, res) {
    for (let i of req.body) {
        db.Offer.findOneAndUpdate({_id: i._id},
            {$set: {'details': i.details,
            }})
            .then(data => {
                return console.log('Успешно');
            })
            .catch(err=> {
                return console.log(err);
            });
    }
}