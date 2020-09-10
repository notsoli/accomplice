const mongoose = require('mongoose');

// create Member schema
const memberSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  accounts: mongoose.Schema.Types.Mixed,
  passcode: String
});

// create Member model
module.exports = mongoose.model('Member', memberSchema);