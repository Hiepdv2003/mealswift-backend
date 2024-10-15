const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["sales", "orders", "performance"],
      required: true,
    },
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    total_orders: { type: Number, default: 0 },
    total_sales: { type: Number, default: 0.0 },
    average_delivery_time: { type: String },
    created_at: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);
