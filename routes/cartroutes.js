const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartcontroller');
const { isloggedin,isadmin } = require('../middleware/auth');

router.post("/addtocart/:product_id", isloggedin, controller.addtocart);
router.get("/getusercart", isloggedin, controller.getusercart);
router.get("/viewcart", controller.viewcart);

module.exports = router;