const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  gender: { type: String, required: true },
  lastLoginDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
