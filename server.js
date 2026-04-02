const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/records", require("./routes/recordRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/users", require("./routes/userRoutes")); 

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});