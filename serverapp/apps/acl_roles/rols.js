const   mongoose        = require('mongoose'),
        node_acl        = require('acl');

module.exports = new Promise( (resolve, reject) => {
    mongoose.connect('mongodb://adelka:adelka123@ds155714.mlab.com:55714/hello_world', {useCreateIndex: true, useNewUrlParser: true}, function (err, db) {
        var acl = new node_acl(new node_acl.mongodbBackend(mongoose.connection.db, 'acl_'));
        resolve(acl);
    });
})