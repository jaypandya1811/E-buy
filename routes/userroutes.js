const express = require('express');
const router = express.Router();
const usermodel = require('../models/user');
const localstrategy = require('passport-local');
const passport = require('passport');
// const isloggedin = require('../middleware/auth');
const { isloggedin } = require('../middleware/auth');

passport.use(new localstrategy(usermodel.authenticate()));

router.get('/sign_in_form', (req,res) => {
res.render('signinform');
});

router.post('/create_account', async (req,res) => {
        try{
        var user = new usermodel({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
        await usermodel.register(user, req.body.password);
        passport.authenticate("local") (req,res, function(){
            req.flash('success','account is created successfully');
            res.redirect('/');
        });
        }catch(err){
            req.flash('error', err.message);
            res.redirect('/sign_in_form');
        }
});

router.get('/login', (req,res) => {
res.render('login');
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), (req,res) => {
    req.flash('success', 'welcome back');
    res.redirect('/');
}
);

router.get('/logout', isloggedin, (req,res, next) => {
    console.log("saburr");
    req.logout((err) => {
        if (err) return next(err);
        return res.redirect('/login');
    });
});

module.exports = router;