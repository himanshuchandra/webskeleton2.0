'use strict';

const mongoose = require("./connection");
const config = require("./config");
const schema = mongoose.Schema;

const userSchema = new schema({
  userid: { type : String , unique : true, required : true },
  useremail: { type : String , unique : true, required : true },
  username: { type : String , unique : true, required : true },
  password1: String,
  salt: String,
  mobile: { type : String , unique : true, sparse: true },
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

const User = mongoose.model(config.userCollection, userSchema);

module.exports = User;