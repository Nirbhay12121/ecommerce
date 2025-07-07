const express = require("express");
const router = express.Router();
const { Wishlist, Product } = require("../model/assosiation");

router.post("/", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const wish = await Wishlist.create({ userId, productId });
    res.json(wish);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const wishes = await Wishlist.findAll({
      where: { userId: req.params.userId },
      include: [Product]
    });
    res.json(wishes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Wishlist.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
