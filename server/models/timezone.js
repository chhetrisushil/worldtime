const mongoose = require('mongoose');

const ZoneSchema = new mongoose.Schema({
    owner: String,
    name: String,
    city: String,
    offset: Number
});

mongoose.model('Timezone', ZoneSchema);

module.exports = mongoose.model('Timezone');