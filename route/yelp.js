'use strict'
const dotenv = require('dotenv');
const express = require('express');
const Yelp = require('yelp-fusion-v3');
let router = express.Router();
dotenv.load();
const yelp = new Yelp({
  client_id: process.env.YELP_ID,
  client_secret: process.env.YELP_SECRET
})

router.get('/', (req, res) => {
  res.send('ok');
});


router
  .route('/businesses')
  .post(function (req, res) {
    yelp.getBusinesses(req.body)
      .then((data) => {
        res.send(data);
      })
      .catch((e) => {
        res.status(500).send(e);
      })
  })

module.exports = router;