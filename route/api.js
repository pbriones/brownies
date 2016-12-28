'use strict'
const express = require('express');
const yelp = require('./yelp');
let router = express.Router();

router.use('/yelp', yelp);

module.exports = router;