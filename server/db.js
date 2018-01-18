// db.js
const config = require('./config/db.json');
const mongoose = require('mongoose');
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