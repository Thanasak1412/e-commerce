require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (token) {
    jwt.verify(
      token,
      process.env.SECRET_ACCESS_TOKEN,
      async (err, decodedUser) => {
        if (err) {
          return res.status(400).json({
            error: "Token is not valid.",
          });
        }

        const user = await User.findById(decodedUser.id).select("-password");
        req.user = user;
        return next();
      }
    );
  } else {
    res.status(400).json({
      error: "You are not authenticate.",
    });
  }
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized.",
      });
    }

    next();
  });
};

module.exports = { verifyToken, verifyTokenAndAuth };
