const express = require("express");
const cors = require("cors");
const con = require("./db.js");

const app = express();

// ✅ Use CORS middleware with correct domains
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local frontend for development
      "https://clinquant-croquembouche-923989.netlify.app", // Old Netlify frontend (if still used)
      "https://cheery-hamster-85c238.netlify.app" // ✅ Your actual deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    credentials: true, // Optional: if using cookies or auth headers
  })
);

// ✅ Connect to database
con();

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Define routes
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api", require("./Routes/CreateUser.js"));
app.use("/api", require("./Routes/DisplayData.js"));
app.use("/api", require("./Routes/orderdata.js"));

// ✅ Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
