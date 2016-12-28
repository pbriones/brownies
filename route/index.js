'use strict'
const express = require('express');
let router = express.Router();

const log = require('../lib/log');
const jsonParser = require('../lib/json-parser');
const cors = require('../lib/cors');

const api = require('./api');

router.use(cors);
router.use(log);
//only handles JSON for now
router.use(jsonParser);

router
  .route('/')
  .get((req, res) => {
    res.sendFile('index.html', {
      root: './view'
    });
  })
  .post((req, res) => {
    console.log(req.headers);
    res.send(req.body);
  })

router.use('/api', api);

module.exports = router;