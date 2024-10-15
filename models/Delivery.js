const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
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
  pickupTime: { type: Date }, // When the order is picked up by delivery personnel
  estimatedDeliveryTime: { type: Date },
  actualDeliveryTime: { type: Date }, // Actual delivery completion time
}, { timestamps: true });

module.exports = mongoose.model("Delivery", deliverySchema);
