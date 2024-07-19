const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const HotamProduct = mongoose.model('HotamProduct', productSchema);

module.exports =  HotamProduct;
