const mongoose = require('mongoose');

const EmployerSchema = new mongoose.Schema({
  empCompanyName: {
    type: String,
    required: true,
  },
  empCompanyWeb: {
    type: String,
    required: true,
  },
  empCompanyEmail: {
    type: String,
    required: true,
  },
  empCompanyDesc: {
    type: String,
    required: true,
  },
  empPassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Employer', EmployerSchema);
