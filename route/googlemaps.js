'use strict';
const Client = require('@google/maps');
const express = require('express');
let router = express.Router();
const client = Client.createClient({
  key: process.env.GOOGLE_DISTANCE_KEY
});

router.get('/', (req, res) => {
  res.send('distance, ok');
});

router
  .route('/distance')
  .post((req, res) => {
    let query = req.body;
    client.distanceMatrix(query, (err, result) => {
      if (err) {
        return res.status(500).send(err)
      }
      res.send(result);
    });
  });

module.exports = router;

