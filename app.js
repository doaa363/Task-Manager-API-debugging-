const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");
const app = express();
app.use(express.json());

// DB Connection
// mongoose
// .connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB connected"))
// .catch((err) => console.log("MongoDB connection error:", err));
console.log("Connecting to Mongo...");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✔ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
