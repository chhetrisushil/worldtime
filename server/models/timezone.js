const mongoose = require('mongoose');

var ZoneSchema = new mongoose.Schema({
  owner: String,
  name: String,
  city: String,
  offset: Number
});

ZoneSchema.index({ name: 'text' });

mongoose.model('Timezone', ZoneSchema);

module.exports = mongoose.model('Timezone');
