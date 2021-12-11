const router = require("express").Router();

const { getWishlists, addWishlist } = require("../controllers/wishlist");
const { verifyTokenAndAuth } = require("../middleware/verifyToken");

router.get("/", verifyTokenAndAuth, getWishlists); // GET USER WISHLIST
router.post("/", verifyTokenAndAuth, addWishlist); // ADD WISHLIST

module.exports = router;
