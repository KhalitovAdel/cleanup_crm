const request = require('request');

var uri     = 'https://api.zadarma.com';
var key     = 'b46b5676866e01003bab';
var secret  = '938b9c6d4bb7d2e262a4';
request({
    url: uri + '/v1/info/balance/',
    headers: {
        "Authorization": `${key}:${secret}`
    }
}, function (err, res, data) {
    if (err) {return console.log(err)}
    console.log(data)
})