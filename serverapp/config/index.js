const mongoose          = require('mongoose');

var state = {
  db: null
};

mongoose.set('useFindAndModify', false);
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
  leadId: String,
  leadStatus: String,
  firmName: String,
  contactPhones: [String],
  contactName: String,
  position: String,
  contactEmail: String,
  address: String,
  lprsName: String,
  comments: [{description: String, createdDate: String}],
  tasks: [{
    status: String,
    action: String,
    description: String,
    createdDate: String,
    deadLineDate: String,
    finishedDate: String
  }],
  link2gis: String,
  createdDate: String
});

OfferSchema  = new mongoose.Schema({
  leadLink: String,
  area: Number,
  regular: Number,
  time: Number,
  twice: Boolean,
  status: String,
  createdDate: Date,
  sentingDate: Date,
  details: {
    fot: Number,
    managerWage: Number,
    tinkoffCommission: Number,
    windowFond: Number,
    material: Number,
    profit: Number,
    itog: Number,
    itogMaterial: Number,
  }
});

exports.freshConnect = conn;
exports.Lead  = conn.model('Lead', LeadSchema);
exports.Offer = conn.model('Offer', OfferSchema);