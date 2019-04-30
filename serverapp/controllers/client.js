const passport      = require('passport'),
mongoose            = require('mongoose'),
makePDF             = require('../apps/pdfmaker/index'),
db                  = require('../config/index');

var Mailer  = require('../apps/mailer/index');

var sendJSONresponse = function(res, status, content) {
    res.status(status).json(content);
}

module.exports.b2bOffer = function(req, res) {
    text = `<p>Площадь: ${req.body.data.area} м<sup>2</sup><p>
            <p>Регулярность: ${req.body.data.regular}<p>
            <p>Номер: ${req.body.data.phone}<p>
            `
    Mailer.sendSomeMessage(undefined, text, undefined)
        .then(data => {
            return sendJSONresponse(res, 200, {message: 'Мы не смогли рассчитать автоматический. Сейчас рассчитаем и пришлем результат!🤟'});
        })
        .catch(err => {
            return sendJSONresponse(res, 404, {message: 'У нас произошла ошибка, пожалуйста позвоните нам! Мы ценим каждое обращение!'});
        })
}