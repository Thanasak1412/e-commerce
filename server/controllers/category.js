const Category = require("../models/Category");
const Product = require("../models/Product");

const getCategories = async (req, res) => {
  try {
    const { category } = req.query;
    const categories = category
      ? await Category.find({ name: category })
      : await Category.find();

    const eProducts = categories[0].products.map(
      async (product) =>
        await Product.findById(product).then((product) => {
          return product;
        })
    );

    const products = await Promise.all(eProducts).then((product) => {
      return product;
    });

    res.status(200).json({
      success: true,
      categories,
      products,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(400).json({
        error: `Cannot find category with the id: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name, img, desc, products } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "You must enter a name.",
      });
    }

    if (!img) {
      return res.status(400).json({
        error: "You must enter a image.",
      });
    }

    if (!products) {
      return res.status(400).json({
        error: "You must enter a product",
      });
    }

    const category = new Category({
      name,
      img,
      desc,
      products,
    });

    const savedCategory = await category.save();

    res.status(201).json({
      success: true,
      message: "Your category has been added successfully!",
      category: savedCategory,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, img, desc, isActive, products } = req.body;

  if (!id) {
    return res.status(400).json({
      error: "You must enter a category id",
    });
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    {
      name,
      img,
      desc,
      isActive,
      products,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Your category has been updated successfully!",
    category: updatedCategory,
  });
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await Category.findByIdAndDelete(id);

    res.status(202).json({
      success: true,
      massage: "Your category has been deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
