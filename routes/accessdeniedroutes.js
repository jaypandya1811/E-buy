const express = require('express');
const router = express.Router();
const controller = require('../controllers/accessdenied');

router.get('/accessdenied', controller.accessdenied);

module.exports = router;