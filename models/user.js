const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/e-buy");

const schema = mongoose.Schema({
    'username': { type: String, required: [true, "username is required"] },
    'firstname': { type: String, required: [true, "firstname is required"] },
    'lastname': { type: String, required: [true, "lastname is required"] },
    'isadmin': { type: Boolean, default: false }
},
    { timestamps: true }
);

schema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', schema);