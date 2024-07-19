const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  instagram: String,
  facebook: String,
  pinterest: String
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
