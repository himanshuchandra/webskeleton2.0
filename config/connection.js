'use strict';
// Step - 1 require the mongoose module

const mongoose = require("mongoose");

const dbconfig = require("./dbconfig");
// Step -2 Connect to the DB
mongoose.connect(dbconfig.dburl);
mongoose.Promise = require('q').Promise;

module.exports = mongoose;
