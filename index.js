const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
mongoose.set('debug', true);


// Load environment variables first
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Improved CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Changed from 5174 to 5173 (common Vite port)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// BodyParser middleware (Express now includes this by default)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Update this part
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
});

// Routes
const candidateRoutes = require("./routes/candidateRoutes");
app.use("/api/candidates", candidateRoutes);

// Basic health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});