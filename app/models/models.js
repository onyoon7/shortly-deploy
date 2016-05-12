var mongoose = require("mongoose");
var Users = require("../schema/userSchema");
var Urls = require("../schema/urlSchema");

//connect to database : test
mongoose.connect("mongodb://localhost/test");

var db = mongoose.connection;

db.on('error', console.error.bind(console, "connect error:"));
db.once('open', function(callback){
	console.log('connection Succeeded.');
});

var User = mongoose.model('User', Users.userSchema);
var Url = mongoose.model('Url',Urls.urlSchema);

module.exports.User = User;
module.exports.Url = Url;
