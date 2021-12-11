const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const { qNew } = req.query;
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else {
      products = await Product.find();
    }
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(400).json({
        error: `Cannot find product with the id: ${id}`,
      });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, desc, img, size, color, price, quantity, brand } = req.body;

    if (!name) {
      return res.status(400).json({ error: "You must enter a name." });
    }
    if (!img) {
      return res.status(400).json({ error: "You must enter a image." });
    }
    if (!price) {
      return res.status(400).json({ error: "You must enter a price." });
    }
    if (!quantity) {
      return res.status(400).json({ error: "You must enter a quantity." });
    }

    const foundProduct = await Product.findOne({ name });
    if (foundProduct) {
      return res
        .status(400)
        .json({ error: "This product name is already in use." });
    }

    const product = new Product({
      name,
      desc,
      img,
      size,
      color,
      price,
      quantity,
      brand,
    });

    const saveProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product has been added successfully!",
      product: saveProduct,
    });
  } catch (error) {
    res.status(500).json({
      error: `Your request could not be processed. Please try again. => ${error}`,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, desc, img, size, color, price, quantity, brand } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        desc,
        img,
        size,
        color,
        price,
        quantity,
        brand,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Product has been updated successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await Product.findOne({ _id: id });
    if (!existingProduct) {
      return res.status(400).json({
        error: `Cannot find product with the id: ${id}`,
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(202).json({
      success: true,
      message: "Product has been deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
