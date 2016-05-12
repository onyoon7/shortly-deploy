var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


var linkSchema = new Schema ({
  url : String,
  baseUrl : String,
  code : String,
  title : String,
  visits : Number,
  date : {type: Date, default: Date.now}
});

// linkSchema.pre('save',function(){
//   var shasum = crypto.createHash('sha1');
//   shasum.update(model.get('url'));
//   model.set('code', shasum.digest('hex').slice(0, 5));
// });

module.exports = linkSchema;