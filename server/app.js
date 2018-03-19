'use strict';
var express = require('express');
var app = express();
var cors = require('cors');
var cookieParser = require('cookie-parser');
var UserController = require('./controller/userController');
var ZoneController = require('./controller/zoneController');

// initialize db
require('./db');

app.use(cookieParser());
app.use(cors());
app.use('/users', UserController);
app.use('/zones', ZoneController);
// console.log('from app.js');
module.exports = app;
