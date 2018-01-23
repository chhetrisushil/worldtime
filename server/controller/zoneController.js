const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/db');

const zoneDb = require('../models/timezone');

router.post('/', function(req, res) {
    var token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.status(500).send("There was an error with token decode.");;
            }
            var owner = decoded.id;
            zoneDb.create({
                    owner : owner,
                    name: req.body.name,
                    city: req.body.city,
                    offset: req.body.offset
                },
                function (err, timezone) {
                    if (err) return res.status(500).send("There was a problem adding the user to the database.");
                    res.status(200).send(timezone);
                });
        });
    } else {
        return res.status(500).send("There was no token added.");
    }

});

router.get('/', function (req, res) {
    // TODO move this in the verify callback, and activated only for admin and userManager
    var token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.status(500).send("There was an error with token decode.");
                ;
            }
            var owner = decoded.id;
            zoneDb.find({owner: owner}, function (err, zones) {
                if (err) return res.status(500).send("There was a problem finding the users.");
                res.status(200).send(zones);
            });
        });
    } else {
        return res.status(500).send("There was no token added.");
    }
});
// timezones by user
router.get('/byUser/', function (req, res) {
  // TODO move this in the verify callback, and activated only for admin and userManager
  var token = req.headers['x-access-token'];
  console.log(req.query);
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.status(500).send("There was an error with token decode.");
        ;
      }
      var owner = req.query.id;
      zoneDb.find({owner: owner}, function (err, zones) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(zones);
      });
    });
  } else {
    return res.status(500).send("There was no token added.");
  }
});

// timezone actions
router.get('/:id', function (req, res) {
    zoneDb.findById(req.params.id, function (err, zone) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!zone) return res.status(404).send("No zone found.");
        res.status(200).send(zone);
    });
});

router.delete('/:id', function (req, res) {
    zoneDb.findByIdAndRemove(req.params.id, function (err, zone) {
        if (err) return res.status(500).send("There was a problem deleting the zone.");
        console.log('zone deleted');
        res.status(200).send({});
    });
});

router.put('/:id', function (req, res) {
    zoneDb.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, zone) {
        if (err) return res.status(500).send("There was a problem updating the zone.");
        res.status(200).send(zone);
    });
});


module.exports = router;
