const express = require('express'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const candidateRoutes = require('./routes/candidateRoutes');
const path = require('path');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Check if MONGODB_URI is defined
if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI is not defined in your .env file.");
    process.exit(1);
}

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files

// MongoDB connection without deprecated options
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Routes
app.use('/api/candidates', candidateRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('An error occurred:', err.message);
    res.status(500).json({ message: 'An internal server error occurred.', error: err.message });
});

// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
