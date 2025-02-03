const express = require('express');
const multer = require('multer');
const Candidate = require('../models/Candidate');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Create a new candidate profile
router.post('/add', upload.single('photo'), async (req, res) => {
    try {
        const experienceArray = req.body.experience ? JSON.parse(req.body.experience) : []; // Parse JSON if it's a string

        const candidateData = {
            personalInfo: {
                photo: req.file ? req.file.path : '',
                name: req.body.name,
                dob: req.body.dob,
                gender: req.body.gender,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                currentEducation: req.body.currentEducation,
                socialMedia: req.body.socialMedia ? req.body.socialMedia.split(',') : [],
                interests: req.body.interests ? req.body.interests.split(',') : [],
                summary: req.body.summary,
            },
            academics: {
                masters: {
                    institution: req.body.mastersInstitution,
                    department: req.body.mastersDepartment,
                    program: req.body.mastersProgram,
                    specialization: req.body.mastersSpecialization,
                    semester: req.body.mastersSemester,
                    rollNo: req.body.mastersRollNo,
                    percentage: req.body.mastersPercentage,
                },
                underGraduation: {
                    institution: req.body.underGradInstitution,
                    department: req.body.underGradDepartment,
                    program: req.body.underGradProgram,
                    specialization: req.body.underGradSpecialization,
                    semester: req.body.underGradSemester,
                    rollNo: req.body.underGradRollNo,
                    percentage: req.body.underGradPercentage,
                },
                puc: {
                    institution: req.body.pucInstitution,
                    department: req.body.pucDepartment,
                    combination: req.body.pucCombination,
                    specialization: req.body.pucSpecialization,
                    rollNo: req.body.pucRollNo,
                    marks: req.body.pucMarks,
                    percentage: req.body.pucPercentage,
                },
                sslc: {
                    institution: req.body.sslcInstitution,
                    rollNo: req.body.sslcRollNo,
                    marks: req.body.sslcMarks,
                    percentage: req.body.sslcPercentage,
                },
            },
            aadhaar: req.body.aadhaar,
            pan: req.body.pan,
            certifications: req.body.certifications ? req.body.certifications.split(',') : [],
            projects: req.body.projects ? req.body.projects.split(',') : [],
            experience: experienceArray,
        };

        // Validate required fields
        if (!candidateData.personalInfo.name || !candidateData.personalInfo.email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        const candidate = new Candidate(candidateData);
        await candidate.save();
        res.status(201).json({ message: 'Candidate profile created successfully', candidate });
    } catch (error) {
        console.error('Error creating candidate profile:', error);
        res.status(500).json({ message: 'Error creating candidate profile', error: error.message });
    }
});

// Get all candidates
router.get('/', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (error) {
        console.error('Error fetching candidates:', error);
        res.status(500).json({ message: 'Error fetching candidates', error: error.message });
    }
});

// Get a candidate by ID
router.get('/:id', async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json(candidate);
    } catch (error) {
        console.error('Error fetching candidate:', error);
        res.status(500).json({ message: 'Error fetching candidate', error: error.message });
    }
});

// Update a candidate profile
router.put('/:id', upload.single('photo'), async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) {
          return res.status(404).json({ message: 'Candidate not found' });
        }

        // Update candidate data
        candidate.personalInfo = {
            ...candidate.personalInfo,
            ...(req.file && { photo: req.file.path }), // Update photo if a new one is uploaded
            name: req.body.name || candidate.personalInfo.name,
            dob: req.body.dob || candidate.personalInfo.dob,
            gender: req.body.gender || candidate.personalInfo.gender,
            address: req.body.address || candidate.personalInfo.address,
            phone: req.body.phone || candidate.personalInfo.phone,
            email: req.body.email || candidate.personalInfo.email,
            currentEducation: req.body.currentEducation || candidate.personalInfo.currentEducation,
            socialMedia: req.body.socialMedia ? req.body.socialMedia.split(',') : candidate.personalInfo.socialMedia,
            interests: req.body.interests ? req.body.interests.split(',') : candidate.personalInfo.interests,
            summary: req.body.summary || candidate.personalInfo.summary,
        };

        candidate.academics = {
            ...candidate.academics,
            masters: {
                ...candidate.academics.masters,
                institution: req.body.mastersInstitution || candidate.academics.masters.institution,
                department: req.body.mastersDepartment || candidate.academics.masters.department,
                program: req.body.mastersProgram || candidate.academics.masters.program,
                specialization: req.body.mastersSpecialization || candidate.academics.masters.specialization,
                semester: req.body.mastersSemester || candidate.academics.masters.semester,
                rollNo: req.body.mastersRollNo || candidate.academics.masters.rollNo,
                percentage: req.body.mastersPercentage || candidate.academics.masters.percentage,
            },
            underGraduation: {
                ...candidate.academics.underGraduation,
                institution: req.body.underGradInstitution || candidate.academics.underGraduation.institution,
                department: req.body.underGradDepartment || candidate.academics.underGraduation.department,
                program: req.body.underGradProgram || candidate.academics.underGraduation.program,
                specialization: req.body.underGradSpecialization || candidate.academics.underGraduation.specialization,
                semester: req.body.underGradSemester || candidate.academics.underGraduation.semester,
                rollNo: req.body.underGradRollNo || candidate.academics.underGraduation.rollNo,
                percentage: req.body.underGradPercentage || candidate.academics.underGraduation.percentage,
            },
            puc: {
                ...candidate.academics.puc,
                institution: req.body.pucInstitution || candidate.academics.puc.institution,
                department: req.body.pucDepartment || candidate.academics.puc.department,
                combination: req.body.pucCombination || candidate.academics.puc.combination,
                specialization: req.body.pucSpecialization || candidate.academics.puc.specialization,
                rollNo: req.body.pucRollNo || candidate.academics.puc.rollNo,
                marks: req.body.pucMarks || candidate.academics.puc.marks,
                percentage: req.body.pucPercentage || candidate.academics.puc.percentage,
            },
            sslc: {
                ...candidate.academics.sslc,
                institution: req.body.sslcInstitution || candidate.academics.sslc.institution,
                rollNo: req.body.sslcRollNo || candidate.academics.sslc.rollNo,
                marks: req.body.sslcMarks || candidate.academics.sslc.marks,
                percentage: req.body.sslcPercentage || candidate.academics.sslc.percentage,
            },
        };

        // Update experience
        if (req.body.experience) {
            const experienceArray = JSON.parse(req.body.experience); // Parse JSON if it's a string
            candidate.experience = experienceArray.map(exp => ({
                jobTitle: exp.jobTitle,
                company: exp.company,
                startDate: exp.startDate,
                endDate: exp.endDate,
                description: exp.description,
            }));
        }

        // Update certifications and projects
        candidate.certifications = req.body.certifications ? req.body.certifications.split(',') : candidate.certifications;
        candidate.projects = req.body.projects ? req.body.projects.split(',') : candidate.projects;

        await candidate.save();
        res.status(200).json({ message: 'Candidate profile updated successfully', candidate });
    } catch (error) {
        console.error('Error updating candidate profile:', error);
        res.status(500).json({ message: 'Error updating candidate profile', error: error.message });
    }
});

// Export the router
module.exports = router;