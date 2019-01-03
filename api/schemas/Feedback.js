const mongoose = require('mongoose');

const Schema = mongoose.Schema,
  model = mongoose.model.bind(mongoose),
  ObjectId = mongoose.Schema.Types.ObjectId;

const feedbackSchema = new Schema({
  id: ObjectId,
  name: String,
  body: String,
  created_at: { type: Date, default: Date.now }
});

const Feedback = model('Feedback', feedbackSchema);
module.exports = Feedback
