const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/e-buy");

const schema = mongoose.Schema({
    'user' : { type: mongoose.Schema.Types.ObjectId, ref : 'users' },
    'product' : { type: mongoose.Schema.Types.ObjectId, required: [true, "product is required"], ref : 'products'},
    'quantity' : { type: Number, default: 1 }
});

module.exports = mongoose.model('carts', schema);