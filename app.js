'use strict'
const dotenv = require('dotenv');
const express = require('express');
const app = express();
dotenv.load();
const CLIENT_ID = process.env.YELP_ID;
const CLIENT_SECRET = process.env.YELP_SECRET;

let port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
let ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.get('/', function (req, res) {
  res.sendFile('index.html', {
    root: './view'
  });
});

var Yelp = require('yelp-fusion-v3');
let yelp = new Yelp({
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET
});
yelp.getBusinesses({ location: '45150' })
  .then(console.log)
  .catch(console.error);
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);