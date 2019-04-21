const mongoose          = require('mongoose');

var node_acl = require('acl'),
User = require('../models/user');

let acl = null;

mongoose.connect('mongodb://adelka:adelka123@ds155714.mlab.com:55714/hello_world', {useCreateIndex: true, useNewUrlParser: true}, function (err, db) {
    if (err) {
      console.log('Ошибка запуска базы')
      return done(err);
    }
    acl = new node_acl( new node_acl.mongodbBackend(mongoose.connection.db, 'acl_') );
    // acl.allow([
    //     {
    //         roles: ['admin'],
    //         allows: [
    //             {
    //             resources: ['/*'],
    //             permissions: ['*'],
    //             },
    //         ],
    //     },
    //     {
    //       roles: ['manager'],
    //       allows: [
    //         {
    //           resources: ['/crm/lead/*', '/crm/offer/*', '/crm/config/getMaterialList', '/crm/config/detect'],
    //           permissions: ['get', 'post', 'put'],
    //         },
    //       ],
    //     },
    //     {
    //         roles: ['guest'],
    //         allows: [
    //           {
    //             resources: ['/crm/config/detect', '/crm/config/login'],
    //             permissions: ['get', 'post'],
    //           },
    //         ],
    //       },
    //   ]);
    // User.findOne({_id: '5c8444fc25f2353630f04954'})
    //   .then(data=> {
    //     // acl.addUserRoles(data._id.toString(), 'admin', err => {
    //     //   if (err) {
    //     //     console.log(err);
    //     //   }
    //     //   console.log('done')
    //     // })
    //     acl.roleUsers('admin', function(err, data2) {
    //       err => console.log(err);
    //       console.log(data2);
    //     })
    //   })
    console.log('ACL подключен к базе');
  });