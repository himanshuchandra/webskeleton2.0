'use strict';

const mongoose = require("./connection");
const config = require("./config");
const schema = mongoose.Schema;

const roleSchema = new schema({
  roleid: { type : String , unique : true, required : true },
  role: { type : String , unique : true, required : true },
  rights: [
    {
      name: String,
      path: String,
      url: String
    }
  ]
});

const Role = mongoose.model(config.roleCollection, roleSchema);

module.exports = Role;