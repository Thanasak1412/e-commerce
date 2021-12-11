const router = require("express").Router();

const {
  getUsers,
  getUser,
  getUserStats,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { verifyTokenAndAuth } = require("../middleware/verifyToken");
const role = require("../middleware/checkRole");

router.get("/", role.checkRole(role.ROLES.admin), getUsers); // GET ALL USER
router.get("/find/:id", verifyTokenAndAuth, getUser); // GET USER
router.get("/stats", role.checkRole(role.ROLES.admin), getUserStats); // GET USER STATS
router.patch("/:id", role.checkRole(role.ROLES.admin), updateUser); // UPDATE USER
router.delete("/:id", role.checkRole(role.ROLES.admin), deleteUser); // DELETE USER

module.exports = router;
