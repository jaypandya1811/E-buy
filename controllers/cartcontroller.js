const cartmodel = require('../models/cartsmodel');

exports.addtocart = async (req,res) => {
    try{
        if(req.body.user == ''){
            req.body.user = req.user.id;
        }
        await cartmodel.create(req.body);
        res.json({ success:true, message: "Added to cart" });
    } catch(err){
        res.send(err);
    }
}; 

exports.getusercart = async (req,res) => {
    try {
        const data = await cartmodel.find({ user : req.user.id });
        res.json(data);
    } catch(err) {
        res.send(err);
    }
};

exports.viewcart = async (req,res) => {
    try{
        if(req.user){
            const data = await cartmodel.find({ user : req.user.id })
            .populate('product')
            .lean()
            res.render('viewcart',{data:data,islogged: req.user ? true : false});
        }else{
            const data = false;
            res.render('viewcart',{data: data,islogged: req.user ? true : false});
        }
    } catch(err){
        console.log(err);
        res.send(err);
    }
};