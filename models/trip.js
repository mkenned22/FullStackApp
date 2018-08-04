const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

const tripSchema = new Schema({
  where: { type: String, required: true },
  when: { type: String, required: true },
  tripNotes: {type: String},
  uid: { type: String, required: true }
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;