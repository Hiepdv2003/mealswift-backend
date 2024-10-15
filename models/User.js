const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String },
    role: {
      type: String,
      enum: ["customer", "delivery", "restaurant", "admin"],
      required: true,
    },
    phone_number: { type: String },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: {
        type: [Number],
        default: [0, 0], // Default to empty array if no coordinates are provided
      },
    },
  },
  { timestamps: true }
);

// Adding geospatial index for location
userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);
