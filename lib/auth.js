'use strict';
module.exports = (req, res, next) => {
  let auth;
  let username = process.env.USERNAME;
  let password = process.env.PASSWORD;

  if (req.headers.authorization) {
    let base64Auth = req.headers.authorization.substring(6);
    auth = new Buffer(base64Auth, 'base64')
      .toString().split(':');
  }

  if (!auth) {
    handleError(res);
  } else {
    try {
      if (auth[0] === username && auth[1] === password) {
        next();
      } else {
        handleError(res);
      }
    } catch (e) {
      handle(res);
    }
  }
}

function handleError(res) {
  console.error('Unauthorized access');
  res.statusCode = 401;
  res.setHeader('WWW-Authenticate', 'Basuc realm="Authentication required"');
  res.end('Unauthorized');
}