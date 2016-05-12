var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var linkSchema = new Schema ({
  url : String,
  baseUrl : String,
  code : String,
  title : String,
  visits : Number,
  date : {type: Date, default: Date.now}
});

module.exports = linkSchema;