// models/AboutUs.js
const mongoose = require('mongoose');

const AboutUsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const AboutUs = mongoose.model('AboutUs', AboutUsSchema);

module.exports = AboutUs;
