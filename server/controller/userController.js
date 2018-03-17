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
router.post('/register', async function (req, res) {
  try {
    let user = await userDb.findOne({
      username: req.body.username
    }).exec();

    if (user) {
      // user exists
      res.status(500).send('User exists.');
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
        res.status(500).send(`User creation failed with following error: ${e.message}`);
      }
    }
  } catch (e) {
    res.status(500).send(`Internal server error: ${e.message}`);
  }
});

router.post('/login', async function (req, res) {
  try {
    const user = await userDb.findOne({
      username: req.body.username
    }).exec();

    if (!user) return res.status(404).send('No user found.');

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    var token = jwt.sign({ id: user._id, role: user.role }, config.secret, { expiresIn: expireTime });
    user.password = null;

    res
      .cookie('token', token, { httpOnly: true, secure: false })
      .status(200)
      .send({ auth: true, user: user, token: token });
  } catch (e) {
    res.status(500).send(`Internal server error ${e.message}`);
  }
});

// All users
router.get('/', function (req, res) {
  var token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) return res.status(500).send('There was a problem decoding the token.');
      if (decoded.role == 0) {
        return res.status(500).send('You don\'t have permission');
      }
      userDb.find({},
        { password: false },
        {
          sort: {
            username: 1 //Sort by Date Added DESC
          }
        },
        function (err, users) {
          if (err) return res.status(500).send('There was a problem finding the users.');
          res.status(200).send(users);
        });
    });
  }
  // TODO move this in the verify callback, and activated only for admin and userManager

});

// User actions
router.get('/:id', function (req, res) {
  userDb.findById(req.params.id, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send('There was a problem finding the user.');
    if (!user) return res.status(404).send('No user found.');
    res.status(200).send(user);
  });
});

router.delete('/:id', function (req, res) {
  userDb.findByIdAndRemove(req.params.id, function (err/* , user */) {
    if (err) return res.status(500).send('There was a problem deleting the user.');
    res.status(200).send({});
  });
});

router.put('/:id', function (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashedPassword;
  userDb.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
    if (err) return res.status(500).send('There was a problem updating the user.');
    res.status(200).send(user);
  });
});

module.exports = router;
