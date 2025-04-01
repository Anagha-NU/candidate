const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate"); // Ensure correct path casing (models vs Models)

// Add New Candidate
router.post("/", async (req, res) => {
    try {
        const newCandidate = new Candidate(req.body);
        const savedCandidate = await newCandidate.save();
        res.status(201).json({
            message: "Candidate added successfully!",
            data: savedCandidate
        });
    } catch (error) {
        console.error("POST Error:", error);
        res.status(400).json({ // Use 400 for client errors
            message: error.name === 'ValidationError' 
                   ? "Validation Error: Check your input data"
                   : "Error adding candidate",
            error: error.message // Send only message in production
        });
    }
});

// Get All Candidates
router.get("/", async (req, res) => {
    try {
        const candidates = await Candidate.find().lean();
        if(candidates.length === 0) {
            return res.status(404).json({ message: "No candidates found" });
        }
        res.status(200).json({
            count: candidates.length,
            data: candidates
        });
    } catch (error) {
        console.error("GET Error:", error);
        res.status(500).json({
            message: "Server error fetching candidates",
            error: error.message
        });
    }
});

// Update Candidate
router.put("/:id", async (req, res) => { // RESTful URL pattern
    try {
        const updatedCandidate = await Candidate.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Return updated doc + validate
        );
        
        if(!updatedCandidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        
        res.status(200).json({
            message: "Candidate updated successfully!",
            data: updatedCandidate
        });
    } catch (error) {
        console.error("PUT Error:", error);
        const statusCode = error.name === 'CastError' ? 404 : 400;
        res.status(statusCode).json({
            message: "Error updating candidate",
            error: error.message
        });
    }
});

// Delete Candidate
router.delete("/:id", async (req, res) => { // RESTful URL pattern
    try {
        const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);
        
        if(!deletedCandidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        
        res.status(200).json({
            message: "Candidate deleted successfully!",
            data: deletedCandidate
        });
    } catch (error) {
        console.error("DELETE Error:", error);
        res.status(400).json({
            message: "Error deleting candidate",
            error: error.message
        });
    }
});

module.exports = router;