const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/e-buy");

const schema = mongoose.Schema({
    'tag': { type: String, unique: true }
});

module.exports = mongoose.model('tags', schema);