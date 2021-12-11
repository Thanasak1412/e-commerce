const role = require("../middleware/checkRole");
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const router = require("express").Router();

router.get("/", getProducts); //GET ALL PRODUCTS
router.get("/:id", getProduct); //GET PRODUCT
router.post("/", role.checkRole(role.ROLES.admin), addProduct); //CREATE PRODUCT
router.patch("/:id", role.checkRole(role.ROLES.admin), updateProduct); //UPDATE PRODUCT
router.delete("/:id", role.checkRole(role.ROLES.admin), deleteProduct); //DELETE PRODUCT

module.exports = router;
