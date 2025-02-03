// models/Candidate.js
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    personalInfo: {
        photo: String,
        name: String,
        dob: Date,
        gender: String,
        address: String,
        phone: String,
        email: String,
        currentEducation: String,
        socialMedia: [String],
        interests: [String],
        summary: String,
    },
    academics: {
        masters: {
            institution: String,
            department: String,
            program: String,
            specialization: String,
            semester: String,
            rollNo: String,
            percentage: String,
        },
        underGraduation: {
            institution: String,
            department: String,
            program: String,
            specialization: String,
            semester: String,
            rollNo: String,
            percentage: String,
        },
        puc: {
            institution: String,
            department: String,
            combination: String,
            specialization: String,
            rollNo: String,
            marks: String,
            percentage: String,
        },
        sslc: {
            institution: String,
            rollNo: String,
            marks: String,
            percentage: String,
        },
    },
    aadhaar: String,
    pan: String,
    certifications: [String], // Added certifications
    projects: [String],
    experience: [{
        jobTitle: String,
        company: String,
        startDate: String,
        endDate: String,
        description: String,
    }],
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);