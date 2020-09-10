const mongoose = require('mongoose');

// create Project schema
const projectSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  link: String,
  member: Number,
  tags: [String]
});

// create Project model
module.exports = mongoose.model('Project', projectSchema);