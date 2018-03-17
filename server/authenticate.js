function authenticate(req, res, next) {
  if (req.path === '/login'/* req.authorised */) {
    next();
  } else {
    res.status(401).send(`Unauthorised Access ${req.path}`);
  }
}

module.exports = authenticate;
