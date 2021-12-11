const { verifyTokenAndAuth } = require("../middleware/verifyToken");
const role = require("../middleware/checkRole");
const {
  getCarts,
  getCart,
  getCartUser,
  addCart,
  updateCart,
  deleteCart,
} = require("../controllers/cart");

const router = require("express").Router();

router.get("/", role.checkRole(role.ROLES.admin), getCarts); //GET ALL CART
router.get("/:id", verifyTokenAndAuth, getCart); // GET CART
router.get("/users/:id", verifyTokenAndAuth, getCartUser); // GET USER CART
router.post("/", verifyTokenAndAuth, addCart); // CREATE CART
router.patch("/:id", verifyTokenAndAuth, updateCart); // UPDATE CART
router.delete("/:id", verifyTokenAndAuth, deleteCart); //DELETE CART

module.exports = router;
