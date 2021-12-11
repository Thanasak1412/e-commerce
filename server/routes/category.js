const router = require("express").Router();

const {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const role = require("../middleware/checkRole");

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", role.checkRole(role.ROLES.admin), addCategory);
router.patch("/:id", role.checkRole(role.ROLES.admin), updateCategory);
router.delete("/:id", role.checkRole(role.ROLES.admin), deleteCategory);

module.exports = router;
