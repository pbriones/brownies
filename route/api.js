'use strict'
const express = require('express');
const yelp = require('./yelp');
const googlemaps = require('./googlemaps');
const restaurant = require('./restaurant');
let router = express.Router();

router.use('/yelp', yelp);
router.use('/googlemaps', googlemaps);
router.use('/restaurant', restaurant);

module.exports = router;