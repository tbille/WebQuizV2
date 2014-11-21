var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

// Connect to cloud database
mongoose.connect("mongodb://webquizdb:webquizdb@ds053140.mongolab.com:53140/webquizdb");

