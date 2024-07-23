const mongoose = require('mongoose');

const logoSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true
      },
    altText: {
        type: String,
        required: true
    }
});

const Logo = mongoose.model('Logo', logoSchema);
module.exports = Logo;
