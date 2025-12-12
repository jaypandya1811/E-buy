function isloggedin(req,res,next){
    if(req.isAuthenticated()){
     return next();
     }
    req.flash('success', 'Login first to proceed further');
    return res.redirect('/login');
}

function isadmin(req,res,next){
    if(req.user.isadmin){
        return next();
    }
    return res.redirect('/accessdenied');
}

module.exports = { isloggedin,isadmin };