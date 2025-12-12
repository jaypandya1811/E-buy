const express = require('express');
const router = express.Router();
const maincategoriescontroller = require('../controllers/main categoriescontroller');

router.post('/addmaincategory', maincategoriescontroller.addmaincategory);

router.get('/getmaincategories', maincategoriescontroller.getmaincategories);

module.exports = router;