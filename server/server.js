const app = require('./app');
const port = process.env.PORT || 3000;
console.log('from server.js');
var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});

module.exports = server; // for testing
