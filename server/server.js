const app = require('./app');
const port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});

/*
const express = require('express');
const routes = require('./routes');
const app = express();

const jsonParser = require('body-parser').json;
//const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/db.json');

mongoose.connect(
            config.connectionString,
            {useMongoClient: true});
const db = mongoose.connection;

db.on('error', err => {
    console.error(`Error while connecting to DB: ${err.message}`);
});
db.once('open', () => {
    console.log('DB connected successfully!');
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
);
if (req.method === 'Options') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
    return res.status(200).json({});
}
});
//app.use(logger('dev'));
app.use(jsonParser());
app.use('/users', routes);
app.use((req, res, next) => {
    const err = new Error('Not Found');
err.status = 404;
next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
res.json({
    error: {
        message: err.message
    }
});
});

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Web server listening on: ${port}`);
});*/