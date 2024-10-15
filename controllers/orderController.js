const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const { sendNotification } = require("../services/notificationService");

// Place a new order
exports.placeOrder = async (req, res) => {
  const { customer_id, restaurant_id, order_items, delivery_location } =
    req.body;

  try {
    // Calculate total amount
    let totalAmount = order_items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = new Order({
      customer_id,
      restaurant_id,
      order_items,
      total_amount: totalAmount,
      delivery_location,
    });

    await newOrder.save();

    // Notify the restaurant of a new order
    await sendNotification(
      restaurant_id,
      "New Order",
      "A new order has been placed"
    );

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};
