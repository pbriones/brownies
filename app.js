'use strict'
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const route = require('./route');
dotenv.load();
const CLIENT_ID = process.env.YELP_ID;
const CLIENT_SECRET = process.env.YELP_SECRET;

let port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
let ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.use('/', route);

var Yelp = require('yelp-fusion-v3');
let yelp = new Yelp({
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET
});
yelp.getBusinesses({ location: '45150' })
  .then()
  .catch(console.error);

console.log(`Time: ${new Date().toISOString()}`)
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);