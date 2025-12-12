const maincategoriesmodel = require('../models/main categoriesmodel');

exports.addmaincategory = async (req,res) => {
try{
    await maincategoriesmodel.create(req.body);
    const data = await maincategoriesmodel.find();
    res.send(data);
} catch(err){
    res.status(400).send(err.message);
}
};

exports.getmaincategories = async (req,res) => {
try{
    const data = await maincategoriesmodel.find();
    res.send(data);
} catch(err){
    res.status(400).send(err.message);
}
};