const router = require("express").Router();

const {
  getAddresses,
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/Address");
const { verifyTokenAndAuth } = require("../middleware/verifyToken");
const role = require("../middleware/checkRole");

router.get("/", role.checkRole(role.ROLES.admin), getAddresses);
router.get("/:id", verifyTokenAndAuth, getAddress);
router.post("/", verifyTokenAndAuth, addAddress);
router.patch("/:id", verifyTokenAndAuth, updateAddress);
router.delete("/:id", verifyTokenAndAuth, deleteAddress);

module.exports = router;
