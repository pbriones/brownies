'use strict';
const express = require('express');
const getRestaurant = require('../lib/restaurant');
let router = express.Router();

router
  .route('/')
  .get((req, res) => res.send('Ok'));

router
  .route('/random')
  .post((req, res) => {
    getRestaurant(req.body)
      .then(data =>
        res.send(data))
      .catch(e =>
        res.status(500).send(e.toString()));
  })

module.exports = router;