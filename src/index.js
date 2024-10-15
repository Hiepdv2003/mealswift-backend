const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("../config/dbConfig");
const authRoutes = require("../routes/authRoutes");
const userRoutes = require("../routes/userRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Connect to databases
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("MealSwift Backend is Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
