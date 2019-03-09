const mongoose          = require('mongoose'),
crypto                  = require('crypto'),
jwt                     = require('jsonwebtoken');

UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
  });
  
  UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };
  
  UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  };
  
  UserSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      username: this.email,
      exp: parseInt(expiry.getTime() / 1000),
    }, 'thisIsSecret');
  };

  var User  = mongoose.model('User', UserSchema);

  module.exports = User;