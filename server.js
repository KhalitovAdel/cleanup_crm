const express = require('express'),
bodyParser    = require('body-parser');

var app         = express(),
router          = require('./serverapp/router/index');

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );

app.use('/', express.static(__dirname + '/dist/cleanupCRM/'));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/cleanupCRM/index.html'));
});

app.use('/', router);

app.listen(4200, function () {
    console.log('API started');
})