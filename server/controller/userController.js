const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/db');

const userDb = require('../models/user');

const expireTime = 86400;

// AUTH
router.post('/register', function (req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    userDb.create({
            username : req.body.username,
            role: req.body.role,
            password : hashedPassword
        },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the user to the database.");

            var token = jwt.sign({ id: user._id, role: user.role }, config.secret, {expiresIn: expireTime});
            res.status(200).send({auth: true, token: token});
        });
});

router.post('/login', function (req, res) {

    userDb.findOne(
      {username: req.body.username },
      function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user._id, role: user.role }, config.secret, {expiresIn: expireTime});
        user.password = null;
        res.status(200).send({ auth: true, token: token, user:user });
    });
});

// All users
router.get('/', function (req, res) {
    var token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
           if (err) return;
           console.log(decoded.role);
        });
    }
    // TODO move this in the verify callback, and activated only for admin and userManager
    userDb.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// User actions
router.get('/:id', function (req, res) {
    userDb.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

router.delete('/:id', function (req, res) {
    userDb.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ user.name +" was deleted.");
    });
});

router.put('/:id', function (req, res) {

    userDb.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

module.exports = router;
