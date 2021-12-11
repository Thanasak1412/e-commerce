require("dotenv").config();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

const getUsers = async (req, res) => {
  try {
    const { qNew } = req.query;

    const users = qNew
      ? await User.find().sort({ id: -1 }).limit(5).select("-password")
      : await User.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(400).json({
        error: `Cannot find user with the id: ${id}`,
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const getUserStats = async (req, res) => {
  try {
    const date = new Date();
    const lastYear = new Date(date.getFullYear(date.getFullYear() - 1));

    const users = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: lastYear,
          },
        },
      },
      {
        $project: {
          month: {
            $month: "$createdAt",
          },
        },
      },
      {
        $group: {
          _id: "$month",
          total: {
            $sum: 1,
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, username, role } = req.body;

    const user = await User.findById(id);

    const existedUser = await User.findOne({ username });
    if (existedUser) {
      res.status(401).json("That username is already in use.");
    }

    const existedEmail = await User.findOne({ email });
    if (existedEmail) {
      res.status(401).json("That email address is already in use.");
    }

    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      {
        firstName,
        lastName,
        email,
        username,
        role,
      },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.status(202).json({
      success: true,
      message: "User has been deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  getUserStats,
  updateUser,
  deleteUser,
};
