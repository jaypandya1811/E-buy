const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/e-buy");

const schema = mongoose.Schema({
        'maincategory': { type: mongoose.Schema.Types.ObjectId, ref: 'maincategories', required: [true, "main category is required"] },
        'subcategory': { type: [mongoose.Schema.Types.ObjectId], ref: 'subcategories', required: [true, "sub category is required"] },
        'category': { type: mongoose.Schema.Types.ObjectId, ref:'categories' ,required: [true, "category is required"]},
        'productname': { type: String, required: [true, "product name is required"], unique: true },
        'price': { type: Number, required: [true, "price is required"] },
        'size':  { type: [String] },
        'color': { type: [String] },
        'offer': { type: String },
        'shortdescription': { type: String, required: [true, "short description is required"] },
        'description': { type: String },
        'coverimage': { type: String },
        'images': { type: [String] },
        'tags': { type: [mongoose.Schema.Types.ObjectId], ref: 'tags' },
        'relatedproducts': [{ type: [mongoose.Schema.Types.ObjectId], ref: 'products' }],
        'status': { type: String, enum: ['active','inactive'], default: 'active' },
},
    { timestamps: true }
);

module.exports = mongoose.model('products', schema);