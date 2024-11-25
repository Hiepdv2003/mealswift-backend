const User = require("../models/User");
const { admin } = require("../config/firebaseConfig");

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
  const { email, password, name, phone_number, role } = req.body;

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
      phone_number,
      role,
      location: { type: "Point", coordinates: [0, 0] },
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    handleError(res, error, "Error creating user");
  }
};

module.exports = {
  signUp,
};
