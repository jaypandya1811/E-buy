const productmodel = require('../models/productsmodel');
const isloggedin = require('../middleware/auth');

exports.shoppage = async (req,res) => {
const products = await productmodel.find();
res.render('shop', {products: products,uid: req.user ? true : false});
};