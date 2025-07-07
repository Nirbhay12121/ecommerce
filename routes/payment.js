const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const { Order } = require("../model/assosiation");

const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_KEY_SECRET"
});

router.post("/:orderId", async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const razorpayOrder = await razorpay.orders.create({
      amount: order.totalAmount * 100,
      currency: "INR",
      receipt: "receipt_" + order.id
    });

    res.json(razorpayOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
