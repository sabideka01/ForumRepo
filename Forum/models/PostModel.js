var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var PostModel = new mongoose.Schema({
  _id:  {type:ObjectIdSchema, default: function () { return new ObjectId()} },
  content: String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostModel);
