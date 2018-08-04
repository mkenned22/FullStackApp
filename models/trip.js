const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

const tripSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: String,
  date: { type: Date, default: Date.now },
  uid: { type: String, required: true }
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;