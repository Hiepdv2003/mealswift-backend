const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" }, // Added currency field
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
    transactionId: { type: String }, // To track third-party payment transactions
    paymentGatewayResponse: { type: Object }, // Log response from the payment gateway
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
