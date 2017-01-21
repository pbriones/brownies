'use strict'
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const route = require('./route');
dotenv.load();

let port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
let ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.use('/', route);

app.listen(port, ip, () => {
  console.log(`Running on: http://${ip}:${port}`);
  console.log(`Started at: ${new Date().toISOString()}`);
});