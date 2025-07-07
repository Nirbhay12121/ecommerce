const express = require("express");
const router = express.Router();
const { Order, OrderItem } = require("../model/assosiation");

router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.params.userId },
      include: [OrderItem]
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
