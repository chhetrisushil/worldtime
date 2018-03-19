const jwt = require('jsonwebtoken');
const config = require('./config/default.json');

function authenticate(req, res, next) {
  try {
    console.log(`token from cookie: ${req.cookies.token}`);
    if (req.path === '/login') {
      return next();
    }

    const token = req.headers['x-access-token'];
    const isValid = jwt.verify(token, config.secret);

    const cookie = req.cookies.token;

    console.log(cookie);

    if (isValid) {
      next();
    } else {
      res.status(401).send(`Unauthorised Access to ${req.path}`);
    }

  } catch (e) {
    res.status(500).send(`Internal Server Error: ${e.message}`);
  }

}

module.exports = authenticate;
