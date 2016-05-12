var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
  username : String,
  password : String,
  date : {type: Date, default: Date.now}
});

// hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }

userSchema.pre('save',function(next){
  var chiper = Promise.promisify(bcrypt.hash);
  chiper(this.password, null, null).bind(this)
  .then(function(hash) {
  	this.password = hash;
  	next();
  })
});


module.exports = userSchema;