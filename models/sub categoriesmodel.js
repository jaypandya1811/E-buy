const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/e-buy");

const schema = mongoose.Schema({
    'subcategory': { type: String, required: [true, "sub category is required"], unique: true },
});

module.exports = mongoose.model('subcategories', schema);