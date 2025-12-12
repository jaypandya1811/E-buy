const subcategoriesmodel = require('../models/sub categoriesmodel');

exports.addsubcategory = async (req,res) => {
try{
    await subcategoriesmodel.create(req.body);
    const data = await subcategoriesmodel.find();
    res.send(data);
} catch(err){
    res.status(400).send(err.message);
}
};

exports.getsubcategories = async (req,res) => {
try{
    const data = await subcategoriesmodel.find();
    res.send(data);
} catch(err){
    res.status(400).send(err.message);
}
};