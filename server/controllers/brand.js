const Brand = require("../models/Brand");

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();

    res.status(200).json({
      success: true,
      brands,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const getBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById(id);

    if (!brand) {
      return res.status(400).json({
        error: `Cannot find brand with the id: ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      brand,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const addBrand = async (req, res) => {
  try {
    const { name, img, desc } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "You must enter a name brand.",
      });
    }

    if (!img) {
      return res.status(400).json({
        error: "You must enter a image brand.",
      });
    }

    const brand = new Brand({
      name,
      img,
      desc,
    });

    const savedBrand = await brand.save();
    res.status(201).json({
      success: true,
      message: "Brand has been added successfully!",
      brand: savedBrand,
    });
  } catch (error) {
    res.json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, img, desc, isActive } = req.body;

    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      {
        name,
        img,
        desc,
        isActive,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Brand has been updated successfully!",
      brand: updatedBrand,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    await Brand.findByIdAndDelete(id);
    res.status(202).json({
      success: true,
      message: "Brand has been deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

module.exports = {
  getBrands,
  getBrand,
  addBrand,
  updateBrand,
  deleteBrand,
};
