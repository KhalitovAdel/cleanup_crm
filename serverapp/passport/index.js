const passport  = require('passport'),
LocalStrategy   = require('passport-local').Strategy;

var User = require('../models/user');


module.exports = function(passport) {
  passport.use(new LocalStrategy({
        usernameField: 'email',
      },
      function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
          console.log('yes'); //Вызывается
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Неправельный почтовый адресс' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Неправельный пароль' });
          }
          return done(null, user);
        });
      }
    ));

  passport.serializeUser(function(user, done) {
    console.log('ser'); //Не вызывается
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    console.log('deser');//Не вызывается
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
};