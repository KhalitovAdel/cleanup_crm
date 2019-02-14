const express = require('express'),
router        = express.Router(),
makePDF       = require('../pdfmaker/');


router.post('/makePDF', function(req, res) {
    makePDF.makePDF(req.body);
    res.send({ status: 'SUCCESS' });
});

module.exports = router;