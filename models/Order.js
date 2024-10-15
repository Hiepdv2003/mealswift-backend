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
      default: "Pending",
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
    totalAmount: { type: Number, required: true },
    currency: { type: String, default: "USD" }, // Added currency for total amount
    deliveryAddress: { type: String, required: true },
    placedAt: { type: Date, default: Date.now }, // Track order placement time
    pickedUpAt: { type: Date }, // Track when order is picked up
    deliveredAt: { type: Date }, // Track when order is delivered
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
