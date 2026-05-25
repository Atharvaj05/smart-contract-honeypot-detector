import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import scanRoutes from "./src/routes/scanRoutes.js";

dotenv.config();

const app = express();

// Explicitly define CORS to allow your frontend port (usually 5173)
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], 
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json({ limit: '50mb' })); // Increase limit for large contract codes

app.use("/api", scanRoutes);

app.get("/", (req, res) => {
    res.send("Honeypot Detector API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend Server running on port ${PORT}`);
});