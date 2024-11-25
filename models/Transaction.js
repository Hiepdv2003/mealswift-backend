// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "PayPal", "Stripe"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    transactionId: { type: String, unique: true },
    paymentGatewayResponse: { type: Object }, // Response from the payment gateway
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
