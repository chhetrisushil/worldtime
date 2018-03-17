const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  timezones: []
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
