// models/MenuItem.js
const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true, // Every item tied to a category
    },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    currency: { type: String, default: "USD" }, // Default currency
    imageUrl: { type: String }, // Optional image URL
    available: { type: Boolean, default: true }, // Availability status
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
