const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: { 
    type: String, 
    required: true 
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Admin = mongoose.model('Admin', adminSchema);

exports.findByEmail = function(email) {
  return Admin.findOne({ email: email });
};

exports.createAccount = function(newAdmin) {
  return Admin.create(newAdmin);
};

