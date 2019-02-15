const express = require('express'),
bodyParser    = require('body-parser');

var app         = express(),
db              = require('./serverapp/config/index'),
router          = require('./serverapp/router/index');

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );

app.use('/', express.static(__dirname + '/dist/cleanupCRM/'));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/cleanupCRM/index.html'));
});

app.use('/', router);

const port = process.env.PORT || 4200;
db.connect(function (err) {
  if (err) {
    return console.log(err);
  }
  app.listen(port, function () {
    console.log(`Работаем на ${port} порту!`);
  });
});