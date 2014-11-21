var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

// Connect to cloud database
var username = "webquizdb"
var password = "webquizdb";
var address = '@ds053140.mongolab.com:53140/webquizdb';
connect();

// Connect to mongo
function connect() {
  var url = 'mongodb://' + username + ':' + password + address;
  mongoose.connect(url);
}
function disconnect() {mongoose.disconnect()}