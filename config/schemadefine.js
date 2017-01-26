// Step -3 Represent Schema

var mongoose = require("./connection");
var config = require("./config");
var Schema = mongoose.Schema;
// Step -4  Creating Schema for the Collection
var userSchema= new Schema({useremail:  String,
  username: String,password1: String,
  mobile:String,
  userinfo: { fullname:String, area: String, city:String,state:String,
    pincode: String,country:String },
  forgotpasscode:Number,role:String});

var User = mongoose.model(config.dbCollection,userSchema); 

module.exports=User;