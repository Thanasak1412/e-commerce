const { verifyToken } = require("./verifyToken");

const ROLES = {
  admin: "ADMIN",
  member: "MEMBER",
};

const checkRole =
  (...roles) =>
  (req, res, next) => {
    verifyToken(req, res, () => {
      if (!req.user) {
        return res.status(401).json({
          error: "Unauthorized.",
        });
      }

      const hasRole = roles.find((role) => req.user.role === role);
      if (!hasRole) {
        return res.status(403).json({
          error: "You are not allowed to make this request.",
        });
      }
      next();
    });
  };

const role = {
  ROLES,
  checkRole,
};

module.exports = role;
