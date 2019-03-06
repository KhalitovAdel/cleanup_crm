const passport  = require('passport'),
LocalStrategy   = require('passport-local').Strategy;

var db = require('../config/index');

passport.use(new LocalStrategy({
      usernameField: 'email'  
    },
    function(username, password, done) {
      db.User.findOne({ email: email }, function (err, user) {
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
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });