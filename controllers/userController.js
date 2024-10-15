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
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user in Firebase Authentication if email is changed
    if (email && email !== user.email) {
      await admin.auth().updateUser(id, { email });
      user.email = email; // Update local user document as well
    }

    // Update user document in MongoDB
    if (name) user.name = name;
    if (role) {
      user.role = role;
      await admin.auth().setCustomUserClaims(id, { role }); // Update role in Firebase
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    handleError(res, error, "Error updating user");
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user from Firebase Authentication
    await admin.auth().deleteUser(id);

    // Delete user document from MongoDB
    await User.deleteOne({ _id: id });
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
