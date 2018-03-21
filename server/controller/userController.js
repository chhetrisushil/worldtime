const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./../config/default.json');

const userDb = require('../models/user');
const authenticate = require('../authenticate.js');

const expireTime = 86400;

// setting up middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(authenticate);

// AUTH
router.post('/register', async (req, res, next) => {
  try {
    let user = await userDb.findOne({
      username: req.body.username
    }).exec();

    if (user) {
      // user exists
      res.status(200).send('User exists.');
    } else {
      try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        user = await userDb.create({
          username: req.body.username,
          role: req.body.role,
          password: hashedPassword
        });

        const token = jwt.sign({ id: user._id, role: user.role }, config.secret, { expiresIn: expireTime });
        user.password = null;

        res.status(200).send({ auth: true, token: token, user: user });
      } catch (e) {
        next(500);
      }
    }
  } catch (e) {
    next(500);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await userDb.findOne({
      username: req.body.username
    }).exec();

    if (!user) return next({ code: 401, msg: 'Username/Password does not match' });

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return next({ code: 401, msg: 'Username/Password does not match' });

    var token = jwt.sign({ id: user._id, role: user.role }, config.secret, { expiresIn: expireTime });
    user.password = null;

    res
      .cookie('token', token, { httpOnly: true, secure: false })
      .status(200)
      .send({ auth: true, user: user, token: token });
  } catch (e) {
    next(500);
  }
});

// All users
router.get('/', async (req, res, next) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, config.secret);
  let response;

  switch (decoded.role) {
    case 'admin':
      try {
        response = await userDb.find({},
          {
            password: false
          },
          {
            sort: {
              username: 1
            }
          }).exec();
      } catch (e) {
        next(500);
      }
      break;

    default:
      next(500);
  }

  res.status(200).send(response);
});

// User actions
router.get('/:id', (req, res, next) => {
  userDb.findById(req.params.id, { password: 0 }, (err, user) => {
    if (err) return next(500);
    if (!user) return next({ code: 404, msg: 'User not found' });

    res.status(200).send(user);
  });
});

router.delete('/:id', (req, res, next) => {
  userDb.findByIdAndRemove(req.params.id, (err/* , user */) => {
    if (err) return next(500);

    res.status(200).send({});
  });
});

router.put('/:id', (req, res, next) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashedPassword;
  userDb.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
    if (err) return next(500);

    res.status(200).send(user);
  });
});

//error handling
/**************************************************************************************
 *                                                                                    *
 *      ERROR HANDLING SHOULD ALWAYS BE DONE AFTER REGISTRATION OF ALL THE ROUTES     *
 *                                                                                    *
 **************************************************************************************/
router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  let msg = 'Internal Server Error';

  err = err || { code: 500, msg };

  if (typeof err === 'number') {
    err = { code: err, msg };
  }

  res.status(err.code).send(err.msg);
});

module.exports = router;
