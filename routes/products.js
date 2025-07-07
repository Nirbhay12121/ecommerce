const express = require("express");
const router = express.Router();
const db = require("../config/db");

// CREATE
router.post("/", async (req, res) => {
  const { name, price, description, category, stock, image } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO products (name, price, description, category, stock, image) VALUES (?, ?, ?, ?, ?, ?)",
      [name, price, description, category, stock, image]
    );
    res.status(201).json({ id: result.insertId, message: "Product created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { name, price, description, category, stock, image } = req.body;
  try {
    const [result] = await db.execute(
      "UPDATE products SET name=?, price=?, description=?, category=?, stock=?, image=? WHERE id=?",
      [name, price, description, category, stock, image, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.execute("DELETE FROM products WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
