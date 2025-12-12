exports.homepage = (req,res) =>{
    res.render('home');
};

exports.flash = (req,res) =>{
    req.flash("name","sodhi");
    res.send(req.flash());
};