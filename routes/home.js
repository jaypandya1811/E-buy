const express = require('express');
const router = express.Router();
const controller = require('../controllers/homecontroller');
const isloggedin = require('../middleware/auth');

router.get('/', controller.homepage);

router.get('/flash', controller.flash);

router.get('/deletesession', (req,res) => {
req.session.destroy((err) => {
if (err) throw err;
console.log(req.session);
res.send("session deleted");
});
});

module.exports = router;