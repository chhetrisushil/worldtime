const jwt = require('jsonwebtoken');
const config = require('./config/default.json');

function authenticate(req, res, next) {
  try {
    console.log(`token from cookie: ${req.cookies.token}`);
    if (req.path === '/login') {
      return next();
    }

    try {
      const token = req.cookies.token;
      const isValid = jwt.verify(token, config.secret);

      if (isValid) {
        next();
      } else {
        throw new Error('Unauthorised Access');
      }
    } catch (e) {
      return next({code: 401, msg: 'Unauthorised Access'});
    }
  } catch (e) {
    next(500);
  }
}

module.exports = authenticate;
