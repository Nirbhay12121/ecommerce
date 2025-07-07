const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");


dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
  console.log('✅ uploads folder created automatically.');
}
  

app.use('/uploads', express.static('uploads'));

const authRoutes = require("./routes/authRoutes");
app.use('/api/auth', authRoutes);

const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

const orderRoutes = require("./routes/orders");
app.use("/api/orders", orderRoutes);

const wishlistRoutes = require("./routes/wishlist");
app.use("/api/wishlist", wishlistRoutes);

const cartRoutes = require("./routes/cart");
app.use("/api/cart", cartRoutes);


const sequelize = require("./config/db");
sequelize.authenticate()

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
