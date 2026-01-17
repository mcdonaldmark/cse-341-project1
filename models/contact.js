const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  favoriteColor: String,
  birthday: String
});

// Mongoose will now automatically use the 'contacts' collection
module.exports = mongoose.model('Contact', contactSchema);
