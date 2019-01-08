const mongoose = require('mongoose');

const Schema = mongoose.Schema,
  model = mongoose.model.bind(mongoose),
  ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
  id: ObjectId,
  name: String,
  password: String,
  email: String,
  phone: String,
  isAdmin: Boolean,
  created_at: { type: Date, default: Date.now }
});

const User = model('User', userSchema);
module.exports = User
