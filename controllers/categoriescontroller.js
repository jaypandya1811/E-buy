const categoriesmodel = require('../models/categoriesmodel');

exports.addcategory = async (req,res) => {
try{
    await categoriesmodel.create(req.body);
    const data = await categoriesmodel.find();
    res.send(data);
} catch(err){
    res.status(400).send(err.message);
}
};

exports.getcategories = async (req,res) => {
try{
    const data = await categoriesmodel.find();
    res.send(data);
} catch(err){
    res.status(400).send(err.message);
}
};