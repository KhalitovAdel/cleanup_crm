const express = require('express'),
configRouter        = express.Router(),
passport      = require('passport');

var ctrlConfig  = require('../../../controllers/config'),
ctrlAuth        = require('../../../controllers/auth');

configRouter.post('/register', ctrlAuth.register);
configRouter.post('/login', ctrlAuth.login); 
configRouter.post('/createNewMaterial', ctrlAuth.mustAuthenticatedMw, ctrlConfig.createNewMaterial);

configRouter.get('/detect', function( req, res) {
    if ( req.isAuthenticated() ) {
        res.status(200).send({ detect: true })
    } else {
        res.status(401).send({ detect: false })
    }
})
configRouter.get('/getMaterialList', ctrlAuth.mustAuthenticatedMw, ctrlConfig.getMaterialList);


module.exports = configRouter;