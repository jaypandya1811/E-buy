const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/e-buy");

const schema = mongoose.Schema({
    'maincategory': { type: String, required: [true, "main category is required"], unique: true },
});

module.exports = mongoose.model('maincategories', schema);