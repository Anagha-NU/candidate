const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  personalInfo: {
    name: String,
    dob: Date,
    gender: String,
    address: String,
    phone: String,
    email: String
  },
  academics: {
    masters: {
      institution: String,
      department: String,
      program: String,
      specialization: String,
      semester: String,
      percentage: Number
    },
    underGraduation: {
      institution: String,
      department: String,
      program: String,
      specialization: String,
      semester: String,
      percentage: Number
    },
    puc: {
      institution: String,
      combination: String,
      marks: Number,
      percentage: Number
    },
    sslc: {
      institution: String,
      marks: Number,
      percentage: Number
    }
  },
  additionalInfo: {
    aadhaar: String,
    pan: String,
    certifications: String,
    projects: String,
    experience: String,
    skills: String,
    languages: String,
    hobbies: String
  }
});

module.exports = mongoose.model('Candidate', candidateSchema);