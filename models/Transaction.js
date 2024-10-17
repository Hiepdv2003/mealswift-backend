// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" }, // Default currency
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "PayPal", "Stripe"], // Supported payment methods
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending", // Initial status
    },
    transactionId: { type: String }, // Transaction ID from third-party
    paymentGatewayResponse: { type: Object }, // Response from the payment gateway
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
