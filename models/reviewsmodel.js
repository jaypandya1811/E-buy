const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/e-buy");

const schema = mongoose.Schema({
    'user': { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: [true, "userdetail is required"] },
    'product': { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: [true, "productdetail is required"] },
    'image' : { type: String },
    'comment': { type: String, required: [true, "comment is required"] },
},
    { timestamps: true }
);

module.exports = mongoose.model('reviews', schema);