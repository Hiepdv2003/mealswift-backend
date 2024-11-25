// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true, // Category tied to a specific restaurant
    },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
