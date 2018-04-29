'use strict';

const mongoose = require("mongoose");

const config = require("./config") 


mongoose.connect(config.dbUrl);
mongoose.Promise = require('q').Promise;

module.exports = mongoose;
