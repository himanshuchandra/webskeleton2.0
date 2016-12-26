// Step - 1 require the mongoose module

var mongoose = require("mongoose");

var dbconfig = require("./dbconfig");
 console.log("db");
// Step -2 Connect to the DB
mongoose.connect(dbconfig.dburl);
module.exports = mongoose;
