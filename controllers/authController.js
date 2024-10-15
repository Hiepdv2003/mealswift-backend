const User = require("../models/User");
const admin = require("../config/firebaseConfig");

// Centralized error handling function
const handleError = (res, error, message, statusCode = 500) => {
  console.error(message, error);
  res.status(statusCode).json({
    message,
    error: error.message,
  });
};

// Create a new user
const signUp = async (req, res) => {
  const { email, password, name, role = "customer" } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Assign custom claims for role-based access
    await admin.auth().setCustomUserClaims(userRecord.uid, { role });

    // Create user document in MongoDB
    const newUser = new User({
      firebaseUid: userRecord.uid,
      email: userRecord.email,
      name,
      role,
      location: { type: "Point", coordinates: [0, 0] }, // Empty array as default
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    handleError(res, error, "Error creating user");
  }
};

// Login a user
const login = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Sign in the user with Firebase
    const userRecord = await admin.auth().getUserByEmail(email);
    // If successful, create a custom token to return to the client
    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    res.status(200).json({ message: "Login successful", token: customToken });
  } catch (error) {
    handleError(res, error, "Error logging in user");
  }
};

module.exports = {
  signUp,
  login,
};
