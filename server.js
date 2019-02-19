const express = require('express'),
bodyParser    = require('body-parser'),
path          = require('path'),
cors          = require('cors');

var app         = express(),
db              = require('./serverapp/config/index'),
router          = require('./serverapp/router/index');

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );

var originsWhitelist = [
  'http://localhost:4200',
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
app.use(cors(corsOptions));

app.use('/', express.static(__dirname + '/dist/cleanupCRM/'));
app.use('/', router);
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/cleanupCRM/index.html'));
});


const port = process.env.PORT || 3000;
db.connect(function (err) {
  if (err) {
    return console.log(err);
  }
  app.listen(port, function () {
    console.log(`Работаем на ${port} порту!`);
  });
});