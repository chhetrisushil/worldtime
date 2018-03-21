const app = require('./app');
const port = process.env.PORT || 3000;

var server = app.listen(port, () => console.log('Express server listening on port ' + port));

module.exports = server; // for testing
