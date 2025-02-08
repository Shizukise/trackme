// indoor_tracking_backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON
app.use(cors()); // Enable CORS for frontend communication


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// User schema for storing location
const userSchema = new mongoose.Schema({
  userId: String,
  x: Number,
  y: Number,
  timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

// API to update user location
app.post("/api/update-location", async (req, res) => {
  const { userId, x, y } = req.body;
  if (!userId || x === undefined || y === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await User.findOneAndUpdate(
      { userId },
      { x, y, timestamp: Date.now() },
      { upsert: true, new: true }
    );
    res.json({ success: true, message: "Location updated" });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

// API to get user location
app.get("/api/get-location", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "User ID required" });

  try {
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
