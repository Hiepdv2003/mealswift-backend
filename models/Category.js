const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // E.g., 'Beverages', 'Appetizers', etc.
    description: { type: String }, // Optional description for the category
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true, // Ensure categories are tied to specific restaurants
    },
    imageUrl: { type: String }, // Optional image representing the category
    isActive: { type: Boolean, default: true }, // Toggle to activate/deactivate a category
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
