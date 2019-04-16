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



OfferSchema  = new mongoose.Schema({
  createdDate: Date,
  leadLink: String,
  objects: [
    {
      area: Number,
      regular: Number,
      time: Number,
      twice: Boolean,
      details: {
        Chemistry: Array,
        Inventory: Array,
        WindowInventory: Array,
        base_nalog_itog: Number,
        base_nalog_itog_material: Number,
        discount: Number,
        employeesCount: Number,
        itog: Number,
        itogMaterial: Number,
        managerWage: Number,
        material: Number,
        materialToStart: Number,
        obnalCommission: Number,
        profit: Number,
        windowFond: Number,
      },
      employees: [
        {
          blackFot: Number,
          count: Number,
          fotOnHand: Number,
          metersPerDay: Number,
          timeToWorkPerDay: Number,
          whiteFot: Number,
          workDayPerMonth: Number,
          zpNalog: {
            MS: Number,
            NDFL: Number,
            Other: Number,
            PS: Number,
            Summ: Number,
            Travm: Number
          }
        }
      ]
    }

  ],
  sentingDate: Date,
  status: String,
  details: {
    fullObj: Boolean,
    base_nalog_itog: Number,
    base_nalog_itog_material: Number,
    discount: Number,
    employeesCount: Number,
    itog: Number,
    itogMaterial: Number,
    managerWage: Number,
    material: Number,
    materialToStart: Number,
    obnalCommission: Number,
    profit: Number,
    windowFond: Number,
  }
});

exports.freshConnect = conn;
exports.Offer = conn.model('Offer', OfferSchema);