let express = require('express');
const homeroute = require('./routes/home');
const userroutes = require('./routes/userroutes');
const usermodel = require('./models/user');
const productroutes = require('./routes/productsroute');
const maincategoriesrouter = require('./routes/main categoriesroutes');
const subcategoriesrouter = require('./routes/sub categoriesroutes');
const tagsroutes = require('./routes/tagsroute');
const categoriesroutes = require('./routes/categoriesroutes');
const shoproutes = require('./routes/shoproute');
const accessdeniedroute = require('./routes/accessdeniedroutes');
const cartroutes = require('./routes/cartroutes');
const session = require('express-session');
const cookieparser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const { createClient } = require('redis');
const { RedisStore } = require('connect-redis');

let app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set("view engine", "ejs");

app.use(express.static('./public'));

app.use('/product_images', express.static('product_images'));

app.use(cookieparser());

const redisClient = createClient();
redisClient.connect().catch(console.error)

app.use(session({
  store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: false,
  secret: 'username',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 1, 
    secure: false
  }
}));

app.use(passport.initialize());

app.use(passport.session());

passport.use(usermodel.createStrategy());
passport.serializeUser(usermodel.serializeUser());
passport.deserializeUser(usermodel.deserializeUser());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use((req,res, next) => {
  res.locals.loggeduser = req.user || null;
  next();
});

app.use((req, res, next) => {
    res.locals.isadmin = false;
    if (req.user && req.user.isadmin) {
        res.locals.isadmin = true;
    }
    next();
});

app.use('/', homeroute);

app.use('/', userroutes);

app.use('/products', productroutes);

app.use('/', maincategoriesrouter);

app.use('/', subcategoriesrouter);

app.use('/', tagsroutes);

app.use('/', categoriesroutes);

app.use('/', shoproutes);

app.use('/', accessdeniedroute);

app.use('/', cartroutes);

// app.use(function errorHandler (err, req, res, next) {
//   if (res.headersSent) {
//     return next(err)
//   }
//   res.status(500)
//   res.render('error', { error: err })
// });

app.listen(3000);