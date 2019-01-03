const mongoose = require('mongoose');

const Schema = mongoose.Schema,
  model = mongoose.model.bind(mongoose),
  ObjectId = mongoose.Schema.Types.ObjectId;


const slotSchema = new Schema ({
    slot_time: String,
    slot_date: String,
    created_at: Date
  });

const Slot = model('Slot', slotSchema);
module.exports = Slot
