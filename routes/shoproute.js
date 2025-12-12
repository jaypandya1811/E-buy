const express =require('express');
const router = express.Router();
const controller = require('../controllers/shopcontroller');

router.get('/shop', controller.shoppage);

module.exports = router;