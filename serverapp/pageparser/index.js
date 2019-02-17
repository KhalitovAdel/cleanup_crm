const Xray = require('x-ray');

var xray = new Xray();

module.exports.pars2gis = async function (url) {
    var varible;
    await xray(url, '._num_4', {
        firmName: '.cardHeader__headerNameText',
        address: '.card__addressLink',
        contactNumber: '.cardActionsButton__btn@href'
    }).then(function(data) {
        varible = data;
    });
    return varible;
};