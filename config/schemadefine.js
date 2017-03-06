// Step -3 Represent Schema

var mongoose = require("./connection");
var config = require("./config");
var Schema = mongoose.Schema;
// Step -4  Creating Schema for the Collection
var userSchema= new Schema({
  useremail:  String,
  username: String,
  password1: String,
  salt: String,
  mobile:String,
  userinfo: {
    fullname:String,
    area: String,
    city:String,
    state:String,
    pincode: String,
    country:String 
  },
  emailverified:Boolean,
  emailactivationtoken:String,
  forgotpasswordtoken:String,
  passwordtokenstamp:Date,
  mobileverificationcode:String,
  temporarymobile:String,
  role:String,
  registrationdate:Date,
  socialconnection:String,
});

var User = mongoose.model(config.dbCollection,userSchema); 

module.exports=User;