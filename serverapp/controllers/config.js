const passport      = require('passport'),
mongoose            = require('mongoose'),
db                  = require('../config/index'),
Material            = require('../models/config');

var sendJSONresponse = function(res, status, content) {
    res.status(status).json(content);
}

module.exports.createNewMaterial = function(req, res) {
    var material = new Material(req.body);
    material.save(function(err) {
        if(err) {
            console.log(err);
            return sendJSONresponse(res, 404, err)
        } else {
            return sendJSONresponse(res, 200, {
                message: 'Удачной работы!'
            });
        }
    });
}

module.exports.getMaterialList = function(req, res) {
    Material.find({})
        .then(data => {
            return sendJSONresponse(res, 200, data);
        })
        .catch(err=> {
            return sendJSONresponse(res, 404, err);
        });
}