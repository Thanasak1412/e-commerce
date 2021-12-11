const router = require("express").Router();
const {
  getBrands,
  getBrand,
  addBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brand");
const role = require("../middleware/checkRole");

router.get("/", getBrands);
router.get("/:id", getBrand);
router.post("/", role.checkRole(role.ROLES.admin), addBrand);
router.patch("/:id", role.checkRole(role.ROLES.admin), updateBrand);
router.delete("/:id", role.checkRole(role.ROLES.admin), deleteBrand);

module.exports = router;
