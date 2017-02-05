'use strict'
const express = require('express');
const yelp = require('./yelp');
const googlemaps = require('./googlemaps');
let router = express.Router();

router.use('/yelp', yelp);
router.use('/googlemaps', googlemaps);

module.exports = router;