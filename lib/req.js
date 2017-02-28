'use strict';
const https = require('https');
const parseUrl = require('url').parse;

module.exports.get = (url, headers) => {
  let options = makeOptions(url, headers, 'GET');
  return new Promise((resolve, reject) => {
    let data = '';
    let req = https.request(options, res => {
      res.on('data', chunk => data += chunk);
      res.on('error', e => reject(e));
      res.on('end', () => resolve(data));
    });
    req.on('error', e => reject(e));
    req.end();
  })
}

function makeOptions(url, headers, method) {
  let parsed = parseUrl(url);
  let ops = {
    host: parsed.host,
    path: parsed.path,
    method: method,
    headers: headers
  }
  return ops;
}