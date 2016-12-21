var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var path = require("path");
    var welcomePage = require("../config/pages");
    var newPath = path.normalize(__dirname+"/..");
    var homePagePath = path.join(newPath,welcomePage);
    console.log("Newpath ",newPath);
    console.log(homePagePath);
    res.sendFile(path.resolve(homePagePath));
    
    //res.render('index', { title: 'Express' });
});

module.exports = router;
