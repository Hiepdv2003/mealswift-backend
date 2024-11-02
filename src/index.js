const express = require("express");
const cors = require("cors");
const connectDB = require("../config/dbConfig");
const authRoutes = require("../routes/authRoutes");
const userRoutes = require("../routes/userRoutes");
const uploadRouter = require("../routes/uploadRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to databases
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRouter);

app.get("/", (req, res) => res.send("MealSwift Backend is Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
