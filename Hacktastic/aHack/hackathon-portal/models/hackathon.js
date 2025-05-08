const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  name: String,
  location: String,
  date: String,
  description: String,
  image: String
});

module.exports = mongoose.model('Hackathon', hackathonSchema);
