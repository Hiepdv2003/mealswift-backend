const express = require("express");
const stripe = require("../config/stripeConfig");
const router = express.Router();

router.post("/charge", async (req, res) => {
  try {
    const { amount, currency, source } = req.body;
    const charge = await stripe.charges.create({
      amount,
      currency,
      source,
    });
    res.status(200).json(charge);
  } catch (error) {
    res.status(500).send("Payment failed");
  }
});

module.exports = router;
