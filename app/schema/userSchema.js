var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema ({
  username : String,
  password : String,
  date : {type: Date, default: Date.now}
});

module.exports = userSchema;