'use strict';
// Step -3 Represent Schema

const mongoose = require("./connection");
const config = require("./config");
const schema = mongoose.Schema;
// Step -4  Creating Schema for the Collection
const userSchema = new schema({
  userid: String,
  useremail: String,
  username: String,
  password1: String,
  salt: String,
  mobile: String,
  userinfo: {
    fullname: String,
    area: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  },
  emailverified: Boolean,
  emailactivationtoken: String,
  forgotpasswordtoken: String,
  passwordtokenstamp: Date,
  mobileverificationcode: String,
  temporarymobile: String,
  role: String,
  registrationdate: Date,
  social: [
    {
      connection: String,
      sId: String,
      accessToken: String
    }
  ]
});

const User = mongoose.model(config.dbCollection, userSchema);

module.exports = User;