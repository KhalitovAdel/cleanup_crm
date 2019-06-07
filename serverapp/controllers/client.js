const passport      = require('passport'),
mongoose            = require('mongoose'),
makePDF             = require('../apps/pdfmaker/index'),
db                  = require('../config/index');

var Mailer  = require('../apps/mailer/index');

var sendJSONresponse = function(res, status, content) {
    res.status(status).json(content);
}

module.exports.order = function(req, res) {
    Mailer.sendSomeMessage(req.body.email, req.body.text, req.body.subject)
        .then(data => {
            return sendJSONresponse(res, 200, true);
        })
        .catch(err => {
            console.log(err)
            return sendJSONresponse(res, 404, err);
        })
}