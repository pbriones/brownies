'use strict';
module.exports = (req, res, next) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    if (body && req.headers['content-type'] === 'application/json') {
      req.body = JSON.parse(body);
    }
    next();
  });
  req.on('error', () => {
    res.status(500).send(new Error('invalid request'));
  })
}