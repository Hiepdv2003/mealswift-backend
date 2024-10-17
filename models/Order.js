// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Cancelled"],
      default: "Pending", // Default order status
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
    totalAmount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    deliveryAddress: { type: String, required: true },
    placedAt: { type: Date, default: Date.now }, // Timestamp for when order was placed
    pickedUpAt: { type: Date }, // When the order was picked up
    deliveredAt: { type: Date }, // When the order was delivered
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
