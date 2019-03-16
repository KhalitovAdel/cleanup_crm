const mongoose      = require('mongoose'),
passport            = require('passport'),
User                = require('../models/user');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.mustAuthenticatedMw = function(req, res, next) {
    if ( !req.isAuthenticated() ) {
        return sendJSONresponse(res, 401, {message: 'Неавторизированный пользователь'});
    } 
    next();    
};

module.exports.register = function(req, res) {
    if(!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            message: 'Все поля обязательны'
        }); 
        return;
    }
    var user = new User();
    user.username = req.body.email;

    user.setPassword(req.body.password);
    user.save(function(err) {
        if(err) {
            console.log(err);
            return sendJSONresponse(res, 404, err)
        } else {
            req.logIn(user, function(err) {
                if (err) { return next(err); }
            })
            return sendJSONresponse(res, 200, {
                message: 'Удачной работы!'
            });
        }
    });
};

module.exports.login = function(req, res) {
    console.log(req.session);
    if(!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            message: 'Все поля обязательны'
        });
        return;
    }
    passport.authenticate('local', function(err, user, info) {
        if(err) {
            sendJSONresponse(res, 404, err);
            return;
        }
        if(user) {
            req.logIn(user, function(err) {
                if (err) { return next(err); }
            })
            sendJSONresponse(res, 200, {
                message: 'Удачной работы!'
            })
        } else {
            sendJSONresponse(res, 401, info)
        }
    })(req, res);
};