const express = require('express');
const router = express.Router();
const subcategoriescontroller = require('../controllers/sub categoriescontroller');

router.post('/addsubcategory', subcategoriescontroller.addsubcategory);

router.get('/getsubcategories', subcategoriescontroller.getsubcategories);

module.exports = router;