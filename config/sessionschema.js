'use strict';
//Schema for session database

const mongoose = require("./connection");
const config = require("./config");
const schema = mongoose.Schema;

const sessionSchema = new schema({
    sessionid: { type: String, unique: true, required: true },
    uuid: { type: String, required: true },
    userid: String,
    useremail: String,
    username: String,
    role: String,
    registrationdate: Date,
    emailverified: Boolean,
    temporarymobile: String,
    mobile: String,
    userinfo:
        {
            fullname: String,
            area: String,
            city: String,
            state: String,
            pincode: String,
            country: String
        },
    createdAt: { type: Date, expires: '30d', default: Date.now },
});

const Session = mongoose.model(config.sessionCollection, sessionSchema);

module.exports = Session;