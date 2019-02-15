const mongoose          = require('mongoose');

var state = {
  db: null
};

exports.connect = function (done) {
  if (state.db) {
    return done();
  }
  mongoose.connect('mongodb://adelka:adelka123@ds155714.mlab.com:55714/hello_world', {useCreateIndex: true, useNewUrlParser: true}, function (err, db) {
    if (err) {
      console.log('Ошибка запуска базы')
      return done(err);
    }
    state.db = db;
    console.log('Подключились к базе данных');
    done();
  });
};
var conn    = mongoose.connection,
LeadSchema  = new mongoose.Schema({
    // id: String,
    name: String,
    // address: String,
    // contacts: Array,
    // contactName: String,
    // position: String,
    // lprsName: String
});

// var UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: true,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   hash: String,
//   salt: String
// });

// UserSchema.methods.setPassword = function(password){
//   this.salt = crypto.randomBytes(16).toString('hex');
//   this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
// };

// UserSchema.methods.validPassword = function(password) {
//   var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
//   return this.hash === hash;
// };

// UserSchema.methods.generateJwt = function() {
//   var expiry = new Date();
//   expiry.setDate(expiry.getDate() + 7);

//   return jwt.sign({
//     _id: this._id,
//     email: this.email,
//     exp: parseInt(expiry.getTime() / 1000),
//   }, "MY_SECRET"); // Рекомендуется устанавливать секрет в качестве переменной среды, а не указывать его в исходном коде
// };

exports.freshConnect = conn;
exports.Lead = conn.model('Lead', LeadSchema);
// exports.User = conn.model('User', UserSchema);