const {
  getOrders,
  getOrderUser,
  getOrderIncome,
  addOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");
const { verifyTokenAndAuth } = require("../middleware/verifyToken");
const role = require("../middleware/checkRole");

const router = require("express").Router();

router.get("/", role.checkRole(role.ROLES.admin), getOrders); // GET ORDERS
router.get("/find/:id", verifyTokenAndAuth, getOrderUser); // GET ORDERS BY USER
router.get("/income", role.checkRole(role.ROLES.admin), getOrderIncome); // GET ORDERS MONTHLY INCOME
router.post("/", verifyTokenAndAuth, addOrder); // ADD ORDER
router.patch("/:id", verifyTokenAndAuth, updateOrder); //UPDATE ORDER
router.delete("/:id", verifyTokenAndAuth, deleteOrder); //DELETE ORDER

module.exports = router;
