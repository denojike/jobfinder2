const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobDesc: {
    type: String,
    required: true,
  },
  jobEdu: {
    type: String,
    required: true,
  },
  jobSkills: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  jobCategory: {
    type: String,
    required: true,
  },
  jobNumVac: {
    type: String,
    required: true,
  },
  jobCity: {
    type: String,
  },
  jobState: {
    type: String,
    required: true,
  },
  jobCountry: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Job', JobSchema);
