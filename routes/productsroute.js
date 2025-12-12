const express = require('express');
const router = express.Router();
const controller = require('../controllers/productscontroller');
const fileupload = require('../middleware/multer');
const { isloggedin,isadmin } = require('../middleware/auth');

router.get('/addproduct', isloggedin, isadmin,controller.productform);

router.post('/addproductpostman', controller.addproductpostman);

router.post('/addproduct', isloggedin, isadmin,
    fileupload.fields([
        { name: 'coverimage', maxCount: 1 },
        { name: 'images' }
    ]),
    controller.addproduct);

router.get('/getallproducts', controller.getallproducts);

router.get('/viewproduct/:id', controller.viewproduct);

router.get('/editproduct/:id', isloggedin, isadmin,controller.updateproductpage);

router.post('/editproduct/:id', isloggedin, isadmin,fileupload.fields([
        { name: 'coverimage', maxCount: 1 },
        { name: 'images' }
    ]),controller.updateproduct);

router.get('/viewproducts', isloggedin, isadmin, controller.viewallproducts);

router.get('/deleteproduct/:id', isloggedin, isadmin, controller.deleteproduct);

router.post('/getproduct', controller.getproduct);

module.exports = router;