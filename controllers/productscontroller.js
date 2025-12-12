const productmodel = require('../models/productsmodel');
const maincategoriesmodel = require('../models/main categoriesmodel');
const subcategoriesmodel = require('../models/sub categoriesmodel');
const tagsmodel = require('../models/tagsmodel');
const categorymodel = require('../models/categoriesmodel');
const isloggedin = require('../middleware/auth');
const { ObjectId } = require('mongoose').Types;

exports.addproduct = async (req,res) => {  
    try{
        const sizes = req.body.size?.split(',').map(s => s.trim()).filter(Boolean);
        const colors = req.body.color?.split(',').map(s => s.trim()).filter(Boolean);
        let coverimage = req.files['coverimage']?.[0].path;
        let images = req.files['images'] ? req.files['images'].map(file => file.path.replace(/\\/g, '/')) : [];
        if(coverimage){
            coverimage = coverimage?.replace(/\\/g, '/');
            if (!coverimage.startsWith('/')) coverimage = '/' + coverimage;
        }
        images = images.map(p => (p.startsWith('/') ? p : '/' + p));
        req.body.coverimage = coverimage;
        req.body.images = images;
        req.body.size = sizes;
        req.body.color = colors;
        req.body.status = req.body.status === 'active' ? 'active' : 'inactive';
        await productmodel.create(req.body);
        console.log('saved');
        req.flash('success', 'product Added successfully');
        return res.redirect('addproduct');
    } catch(err) {
        console.log(req.body);
        console.log(err.message);
        req.flash('error', err.message);
        return res.redirect('addproduct');
    }
};

exports.getallproducts = async (req,res) => {
try{
    const products = await productmodel.find();
    res.send(products);
}catch(err){
    res.send(err.message);
}
};

exports.productform =  async (req,res) => {
const maincategories = await maincategoriesmodel.find();
const subcategories = await subcategoriesmodel.find();
const tags = await tagsmodel.find();
const categories = await categorymodel.find();
const products = await productmodel.find()
.populate('maincategory','maincategory -_id')
.populate('subcategory','subcategory -_id')
.populate('category','category -_id')
.populate('tags','tag -_id');
res.render('addproduct',{maincategories: maincategories,subcategories: subcategories, tags: tags, products: products, categories: categories});
};

exports.addproductpostman = async (req,res) => {
try{
    await productmodel.create(req.body);
    const data = await productmodel.find();
    res.send(data);
} catch(err) {
    res.send(err.message);
}
};

exports.updateproductpage = async (req,res) => {
try{
const id = req.params.id;
const product = await productmodel.findById(id)
.populate('maincategory','maincategory _id')
.populate('subcategory','subcategory _id')
.populate('category','category _id')
.populate('tags','tag _id')
.populate('relatedproducts','productname _id')
.lean();
const maincategories = await maincategoriesmodel.find();
const subcategories = await subcategoriesmodel.find();
const tags = await tagsmodel.find();
const products = await productmodel.find();
const categories = await categorymodel.find();
res.render('updateproduct', {
    product: product,
    maincategories: maincategories,
    subcategories: subcategories,
    tags: tags,
    products: products,
    categories: categories,
    success: req.flash('success'),
    error: req.flash('error')
});
} catch (err){

}
};

exports.updateproduct = async (req,res) => {
try{
let coverimage = req.files['coverimage']?.[0].path.replace(/\\/g, '/');
let images = req.files['images']? req.files['images'].map(file => file.path.replace(/\\/g, '/')) : [];
const productimg = await productmodel.findById(req.params.id);
if(coverimage){
    req.body.coverimage = coverimage;
}else{
    req.coverimage = productimg.coverimage;
}
if(images.length > 1){
    req.body.images = images;
}else{
    req.body.images = productimg.images;  
}
const id = req.params.id;
console.log(req.body.status);
if(await productmodel.findByIdAndUpdate(id, req.body)){
const product = await productmodel.findById(id)
.populate('maincategory','maincategory _id')
.populate('subcategory','subcategory _id')
.populate('category','category _id')
.populate('tags','tag _id')
.populate('relatedproducts','productname _id')
.lean();
const maincategories = await maincategoriesmodel.find();
const subcategories = await subcategoriesmodel.find();
const tags = await tagsmodel.find();
const products = await productmodel.find();
const categories = await categorymodel.find();
req.flash('success', 'Product edited successfully');
// return res.redirect('updateproduct');
res.render('updateproduct', {
    product: product,
    maincategories: maincategories,
    subcategories: subcategories,
    tags: tags,
    products: products,
    categories: categories,
});
}else{
const product = await productmodel.findById(id)
.populate('maincategory','maincategory _id')
.populate('subcategory','subcategory _id')
.populate('category','category _id')
.populate('tags','tag _id')
.populate('relatedproducts','productname _id')
.lean();
const maincategories = await maincategoriesmodel.find();
const subcategories = await subcategoriesmodel.find();
const tags = await tagsmodel.find();
const products = await productmodel.find();
const categories = await categorymodel.find();
req.flash('error', 'Error has occured');
res.render('updateproduct', {
    product: product,
    maincategories: maincategories,
    subcategories: subcategories,
    tags: tags,
    products: products,
    categories: categories,
});
}
} catch (err){
    console.error(err);
    res.status(500).send(err.message);
}
};

exports.viewproduct = async (req,res) => {
try{
const product = await productmodel.findById(req.params.id)
.populate('maincategory','maincategory -_id')
.populate('subcategory','subcategory -_id')
.populate('category','category -_id')
.populate('tags','tag -_id')
.populate('relatedproducts','product -_id')
.lean();
console.log(product);
res.render('viewproduct', {
    product: product,
});
} catch (err){
const products = await productmodel.find();
console.log(err.message);

req.flash('error', err.message);
res.render('shop',{products:products});
}
};

exports.viewallproducts = async (req,res) => {
    const products = await productmodel.find()
    .populate('maincategory','maincategory -_id')
    .populate('subcategory','subcategory -_id')
    .populate('category','category -_id')
    .populate('tags','tag -_id')
    .populate('relatedproducts','product -_id')
    .lean();
    res.render('viewallproducts',{products: products});
};

exports.deleteproduct = async (req,res) => {
    const id = req.params.id;
    try{
        await productmodel.findByIdAndDelete(id);
        req.flash("success","Product deleted successfully")
        res.redirect('/products/viewproducts');
    } catch(err){
        req.flash("error",err);
        res.redirect('/products/viewproducts');
    }
};

exports.getproduct = async (req, res) => {
    try {
        const ids = req.body.ids;
        const data = await productmodel.find(
            { _id: { $in: ids } },
            { 
                _id: 1,
                productname: 1,
                price: 1,
                coverimage: 1,
                shortdescription: 1,
                offer: 1, 
                color: 1,
                size: 1
            }
            )
            .populate("color")
            .populate("size");
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};