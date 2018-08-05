const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

const tripSchema = new Schema({
  where: { type: String, required: true },
  from: { type: String, required: true },
  to: {type: String, required: true},
  cost: {type: String, required: true},
  people: {type: String, required: true},
  highlights: {type: String, required: true},
  changes: {type: String, required: true},
  //stars: {type: String, required: true},
  uid: { type: String, required: true }
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;