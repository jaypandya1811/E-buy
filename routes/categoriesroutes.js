const express = require('express');
const router = express.Router();
const categoriescontroller = require('../controllers/categoriescontroller');

router.post('/addcategory', categoriescontroller.addcategory);

router.get('/getcategories', categoriescontroller.getcategories);

module.exports = router;