var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, "connect error:"));
db.once('open', function(callback){
	console.log('connection Succeeded.');
});

module.exports = db;
