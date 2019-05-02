const mongoose      = require('mongoose'),
passport            = require('passport'),
User                = require('../models/user'),
crypto              = require('crypto');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}
var acl = require('../apps/acl_roles/rols');
var mailer = require('../apps/mailer/index');

module.exports.mustAuthenticatedMw = function(req, res, next) {
    if ( !req.isAuthenticated() ) {
        return sendJSONresponse(res, 401, {message: 'Неавторизированный пользователь'});
    } 
    next();    
};

module.exports.getUser = function(req, res) {
    User.findOne({_id: req.body.id})
        .then(data=> {
            if (data.salt) {
               return sendJSONresponse(res, 200, false);
            }
            return sendJSONresponse(res, 200, data);
        })
        .catch(err=> {
            return sendJSONresponse(res, 404, err);
        });
};

module.exports.invite = function(req, res) {
    if(!req.body.email) {
        sendJSONresponse(res, 400, {
            message: 'Все поля обязательны'
        }); 
        return;
    }
    var user = new User();
    user.username = req.body.email;
    user.role = req.body.role;
    user.createdDate = new Date;
    user.status = 'saved';

    user.save()
    .then(data=> {
        mailer.sendSomeMessage(data.username, req.headers.origin +'/invite/'+ data._id, 'Вас пригласили');
        sendJSONresponse(res, 200, {
            message: 'Успешно'
        });
        return data;
        
    })
    .then(data=> {
        User.findByIdAndUpdate({_id: data._id},
        {$set: {status: 'invited'} },
        {new: true}, 
        function(err, data) {})
    })
    .catch(err=> {
        console.log(err)
    })
};

module.exports.finishUserRegistration = function(req, res) {
    console.log(req.files)
    var qsalt = crypto.randomBytes(16).toString('hex');
    var qhash = crypto.pbkdf2Sync(req.body.user.password, qsalt, 1000, 64, 'sha512').toString('hex');
    User.findOneAndUpdate({_id: req.body.id},
        {$set: {status: 'registered', hash: qhash, salt: qsalt, Name: req.body.user.Name, Surname: req.body.user.Surname, BirthDate: req.body.user.BirthDate } },
        {new: true}, 
        function(err, data) {
            console.log(data)
            
            acl.then(acl=>{
                acl.addUserRoles(data._id.toString(), data.role, err => {
                    if (err) {
                        console.log(err);
                        sendJSONresponse(res, 400, err); 
                    }
                });
                acl.roleUsers('admin', function(err, users) {
                    console.log(users)
                })
            })
        })
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


module.exports.hasRole = function(req, res) {
    User.findOne({_id: req.user._id})
        .then(data=> {
            return sendJSONresponse(res, 200, {role: data.role});
        })
        .catch(err=> {
            return sendJSONresponse(res, 404, err);
        });
}

// module.exports.register = function(req, res) {
//     if(!req.body.email || !req.body.password) {
//         sendJSONresponse(res, 400, {
//             message: 'Все поля обязательны'
//         }); 
//         return;
//     }
//     var user = new User();
//     user.username = req.body.email;

//     user.setPassword(req.body.password);
//     user.save(function(err) {
//         if(err) {
//             console.log(err);
//             return sendJSONresponse(res, 404, err)
//         } else {
//             req.logIn(user, function(err) {
//                 if (err) { return next(err); }
//             })
//             return sendJSONresponse(res, 200, {
//                 message: 'Удачной работы!'
//             });
//         }
//     });
// };