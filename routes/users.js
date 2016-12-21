var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/checklogin', function(req, res, next) {
  res.send('Welcome '+req.body.userid+" "+req.body.password);
});

module.exports = router;
