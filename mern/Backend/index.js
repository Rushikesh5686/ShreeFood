const express = require("express");
const cors = require("cors");
const con = require("./db.js");

const app = express();

// ✅ Use CORS middleware properly
app.use(
  cors({
    origin: ["http://localhost:5173", "https://clinquant-croquembouche-923989.netlify.app"], // Allow both local and deployed frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    credentials: true, // Allow cookies/auth headers if needed
  })
);

con();

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(express.json()); // Important for parsing JSON

app.use("/api", require("./Routes/CreateUser.js"));
app.use("/api", require("./Routes/DisplayData.js"));
app.use("/api", require("./Routes/orderdata.js"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
