const express = require("express");
const router = express.Router();
const { Cart, Product, Order, OrderItem } = require("../model/assosiation");

// ADD TO CART + create order
router.post("/", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cartItem = await Cart.create({ userId, productId, quantity });

    const product = await Product.findByPk(productId);
    const totalAmount = product.price * quantity;

    const order = await Order.create({
      userId,
      totalAmount,
      paymentStatus: "Pending"
    });

    await OrderItem.create({
      orderId: order.id,
      productId,
      quantity,
      price: product.price
    });

    res.json({ cartItem, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL CART ITEMS
router.get("/:userId", async (req, res) => {
  try {
    const items = await Cart.findAll({
      where: { userId: req.params.userId },
      include: [Product]
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// REMOVE FROM CART
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Cart.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
