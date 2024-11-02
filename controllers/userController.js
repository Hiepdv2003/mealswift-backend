const User = require("../models/User");
const { admin } = require("../config/firebaseConfig");
const USER_ROLES = require("../utils/constants");
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

// Get the profile of the authenticated user
const getUserProfile = async (req, res) => {
  try {
    // Check if user information is available in the request
    if (!req.user || !req.user.uid) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Find the user in MongoDB by their Firebase UID
    const user = await User.findOne({ firebaseUid: req.user.uid });

    if (!user) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // Return the user's profile excluding sensitive information
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      imageUrl: user.imageUrl,
    });
  } catch (error) {
    handleError(res, error, "Error fetching user profile");
  }
};

// Update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, name, role, imageUrl } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update Firebase Authentication only if email or role has changed
    if (email && email !== user.email) {
      await admin.auth().updateUser(user.firebaseUid, { email });
      user.email = email; // Update the local user instance
    }

    if (role && role !== user.role) {
      await admin.auth().setCustomUserClaims(user.firebaseUid, { role });
      user.role = role; // Update the local user instance
    }

    // Update MongoDB in one call if there are changes
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (role) updatedFields.role = role;
    if (imageUrl) updatedFields.imageUrl = imageUrl;

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
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

const getRoles = (req, res) => {
  res.json(USER_ROLES);
};

module.exports = {
  getAllUsers,
  getUserProfile,
  updateUser,
  deleteUser,
  getRoles,
};
