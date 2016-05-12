var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Schema = mongoose.Schema;


var linkSchema = new Schema ({
  url : String,
  baseUrl : String,
  code : String,
  title : String,
  visits : Number,
  date : {type: Date, default: Date.now}
});

linkSchema.pre('save',function(next){
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

module.exports = linkSchema;