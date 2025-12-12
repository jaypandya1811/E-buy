const tagsmodel = require('../models/tagsmodel');

exports.addtag = async (req,res) => {
    try{
     await tagsmodel.create(req.body);
     const data = await tagsmodel.find();
     res.send(data);
    } catch(err) {
      res.status(400).send(err.message);
    }
};

exports.getalltags = async (req,res) =>{
    try{
        const tags = await tagsmodel.find();
        res.send(tags);
    } catch(err) {
        res.status(400).send(err.message);
    }
};