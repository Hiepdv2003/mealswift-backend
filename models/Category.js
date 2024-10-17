// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Unique category name
    description: { type: String }, // Optional category description
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true, // Category tied to a specific restaurant
    },
    imageUrl: { type: String }, // Optional image for the category
    isActive: { type: Boolean, default: true }, // Active status for the category
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
