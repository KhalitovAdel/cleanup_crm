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
    firmName: String,
    address: String,
    contactNumber: Array,
    contactEmail: Array,
    contactName: String,
    position: String,
    lprsName: String,
    parser2gis: String
});

TaskSchema = new mongoose.Schema({
  actionValue: '',
  description: '',
  taskWhenDo: Date,
  lead_id: '',
  createdDate: Date
});

DealSchema  = new mongoose.Schema({
    area: Number,
    regularValue: Number,
    timeValue: Number
});

exports.freshConnect = conn;
exports.Lead = conn.model('Lead', LeadSchema);
exports.Deal = conn.model('Deal', DealSchema);
exports.Task = conn.model('Task', TaskSchema);