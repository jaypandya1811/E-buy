const express = require('express');
const router = express.Router();
const tagscontroller = require('../controllers/tagscontroller');

router.post('/addtag', tagscontroller.addtag);

router.get('/gettags', tagscontroller.getalltags);

module.exports = router;
