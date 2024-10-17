const User = require("../models/User");
const admin = require("../config/firebaseConfig");
//const handleError = require("../services/handleError");

// Centralized error handling function
const handleError = (res, error, message, statusCode = 500) => {
  console.error(message, error);
  res.status(statusCode).json({
    message,
    error: error.message,
  });
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    handleError(res, error, "Error fetching users");
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    handleError(res, error, "Error fetching user");
  }
};

// Update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, name, role } = req.body;

  try {
    const updates = {}; // Create an object to hold the updates

    // Update user in Firebase Authentication if email is changed
    if (email) updates.email = email;
    if (name) updates.name = name;
    if (role) updates.role = role;

    // Update user document in MongoDB using findByIdAndUpdate
    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update Firebase Authentication if email has changed
    if (email && email !== user.email) {
      await admin.auth().updateUser(user.firebaseUid, { email });
      user.email = email; // Update local user document as well
    }

    // Update role in Firebase
    if (role) {
      await admin.auth().setCustomUserClaims(user.firebaseUid, { role });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    handleError(res, error, "Error updating user");
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // First delete from Firebase Authentication
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await admin.auth().deleteUser(user.firebaseUid); // Use firebaseUid here

    // Now delete from MongoDB using findByIdAndDelete
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    handleError(res, error, "Error deleting user");
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
