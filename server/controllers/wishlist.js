const Wishlist = require("../models/Wishlist");

const getWishlists = async (req, res) => {
  try {
    const user = req.user.id;

    const wishlists = await Wishlist.find({
      user,
      isLiked: true,
    })
      .populate({
        path: "product",
        select: "name img price color size",
      })
      .sort("-updatedAt");

    if (!user) {
      return res.status(401).json({
        error: "UnAuthorized.",
      });
    }

    res.status(200).json({
      success: true,
      wishlists,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const addWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product, isLiked } = req.body;

    const update = {
      product,
      isLiked,
    };

    const query = {
      product: update.product,
      user: userId,
    };

    const updatedWishlist = await Wishlist.findOneAndUpdate(query, update, {
      new: true,
    });

    if (updatedWishlist !== null) {
      return res.status(200).json({
        success: true,
        message: "Your wishlist has been updated successfully!",
        wishlist: updatedWishlist,
      });
    } else {
      const wishlist = new Wishlist({
        product,
        user: userId,
        isLiked,
      });

      const savedWishlist = await wishlist.save();

      return res.status(200).json({
        success: true,
        message: "Your wishlist has been added successfully!",
        wishlist: savedWishlist,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Your request could not be processed. Please try again." + error,
    });
  }
};

module.exports = {
  getWishlists,
  addWishlist,
};
