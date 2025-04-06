const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    personalInfo: {
        name: { type: String, required: true },
        dob: { type: Date, required: true },
        gender: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true, unique: true }, // Ensure this is unique
    },
    academics: {
        masters: {
            institution: String,
            department: String,
            program: String,
            specialization: String,
            semester: String,
            percentage: String,
        },
        underGraduation: {
            institution: String,
            department: String,
            program: String,
            specialization: String,
            semester: String,
            percentage: String,
        },
        puc: {
            institution: String,
            combination: String,
            marks: String,
            percentage: String,
        },
        sslc: {
            institution: String,
            marks: String,
            percentage: String,
        },
    },
    additionalInfo: {
        aadhaar: String,
        pan: String,
        certifications: String,
        projects: String,
        experience: String,
        skills: String,
        languages: String,
        hobbies: String,
    },
});

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;