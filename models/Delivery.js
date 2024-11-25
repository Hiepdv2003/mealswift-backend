// models/Delivery.js
const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    deliveryPersonnelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Picked Up", "In Transit", "Delivered", "Cancelled"],
      default: "Pending",
    },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] },
    },
    pickupTime: { type: Date }, // When the order is picked up
    estimatedDeliveryTime: { type: Date }, // Estimated delivery time
    actualDeliveryTime: { type: Date }, // Actual delivery completion time
  },
  { timestamps: true }
);

module.exports = mongoose.model("Delivery", deliverySchema);
