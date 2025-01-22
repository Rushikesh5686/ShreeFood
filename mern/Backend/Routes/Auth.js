const express = require("express");
const cors = require("cors");  // Import cors
const axios = require("axios");
const app = express();

// Enable CORS middleware with specific options
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests only from this origin (adjust as needed)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific methods
  allowedHeaders: ["Content-Type"], // Allow specific headers
};

app.use(cors(corsOptions));

// Enable JSON parsing for incoming requests
app.use(express.json());

// Define the POST route for /api/auth/getlocation
app.post("/api/auth/getlocation", async (req, res) => {
  const { latlong } = req.body;

  if (!latlong || !latlong.lat || !latlong.long) {
    return res.status(400).json({ error: "Invalid latitude or longitude" });
  }

  const { lat, long } = latlong;

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&addressdetails=1`;
    const response = await axios.get(url);

    const { address } = response.data;

    if (address) {
      const location = `${address.road || ""}, ${address.city || ""}, ${address.state || ""}, ${address.country || ""}`.trim();
      return res.json({ location });
    } else {
      return res.status(404).json({ error: "No address found for the given coordinates" });
    }
  } catch (error) {
    console.error("Error fetching location:", error.message);
    res.status(500).json({ error: "Failed to fetch location" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
