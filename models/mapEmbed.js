// models/mapEmbed.js
const mongoose = require('mongoose');

const mapEmbedSchema = new mongoose.Schema({
  embedCode: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('MapEmbed', mapEmbedSchema);
