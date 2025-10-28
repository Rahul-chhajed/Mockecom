const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mockecom");

const Product = mongoose.model("Product", { name: String, price: Number });
const Cart = mongoose.model("Cart", { productId: String, qty: Number });

// Mock products (seed once)
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  if (products.length === 0) {
    await Product.insertMany([
      { name: "Sweater", price: 499 },
      { name: "Shoes", price: 1299 },
      { name: "Watch", price: 899 },
      { name: "Bottle", price: 399 },
      { name: "Cap", price: 299 },
    ]);
  }
  res.json(await Product.find());
});

// Cart APIs
app.post("/api/cart", async (req, res) => {
  const { productId, qty } = req.body;
  const cartItem = new Cart({ productId, qty });
  await cartItem.save();
  res.json(cartItem);
});

app.get("/api/cart", async (req, res) => {
  const cart = await Cart.find();
  const products = await Product.find();
  const detailedCart = cart.map(c => {
    const prod = products.find(p => p._id.toString() === c.productId);
    return { ...c._doc, name: prod?.name, price: prod?.price, total: prod?.price * c.qty };
  });
  const total = detailedCart.reduce((s, i) => s + i.total, 0);
  res.json({ items: detailedCart, total });
});

app.delete("/api/cart/:id", async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
});

app.post("/api/checkout", async (req, res) => {
  const { cartItems } = req.body;
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  await Cart.deleteMany();
  res.json({ success: true, total, timestamp: new Date() });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
