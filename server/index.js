require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const brandRoute = require("./routes/brand");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const wishlistRoute = require("./routes/wishlist");
const categoryRoute = require("./routes/category");
const addressRoute = require("./routes/address");
// const contactRoute = require("./routes/contact");
const stripeRoute = require("./routes/stripe");

const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/brands", brandRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/wishlists", wishlistRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/address", addressRoute);
// app.use("/api/contact", contactRoute);
app.use("/api/checkout", stripeRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
