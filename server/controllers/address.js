const Address = require("../models/Address");

const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();

    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const getAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findById(id);

    res.status(200).json({
      success: true,
      address,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const addAddress = async (req, res) => {
  try {
    const user = req.user.id;
    const { address, city, state, country } = req.body;

    if (!address || !city || !state || !country) {
      return res.status(400).json({
        error: "Your must enter a address",
      });
    }

    if (!user) {
      return res.state(400).json({
        error: `Can't find username with id ${user}`,
      });
    }

    const addressDoc = new Address({
      user,
      address,
      city,
      state,
      country,
    });

    const savedAddress = await addressDoc.save();

    res.status(201).json({
      success: true,
      message: "Your address has been added successfully!",
      address: savedAddress,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, city, state, country } = req.body;

    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      {
        address,
        city,
        state,
        country,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Your address has been updated successfully!",
      address: updateAddress,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    await Address.findByIdAndDelete(id);

    res.status(202).json({
      success: true,
      message: "Your address has been deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

module.exports = {
  getAddresses,
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
};
