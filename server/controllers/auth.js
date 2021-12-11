require("dotenv").config();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { omit } = require("lodash");

// register
const register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, confirmPassword } =
      req.body;

    if (!firstName || !lastName)
      res.status(400).json({
        error: "You must enter your full name.",
      });

    if (!username)
      res.status(400).json({
        error: "You must enter your username.",
      });

    if (!email)
      res.status(400).json({
        error: "You must enter your email.",
      });

    if (!password || !confirmPassword)
      res.status(400).json({
        error: "You must enter your password.",
      });

    if (password !== confirmPassword)
      res.status(400).json({
        error: "Your passwords not match.",
      });

    const existingUser = await User.findOne({ email }, "-password");

    if (existingUser) {
      return res.status(400).json({
        error: "That email address is already in use.",
      });
    }

    const hashedPassword = await CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_PASSWORD_KEY
    ).toString();

    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      { id: newUser._id },
      process.env.SECRET_ACCESS_TOKEN,
      {
        expiresIn: "3d",
      }
    );

    const refreshToken = jwt.sign(
      {
        id: newUser.Id,
      },
      process.env.SECRET_REFRESH_TOKEN
    );

    const data = omit(newUser.toJSON(), ["password", "updatedAt", "createdAt"]);

    res.status(201).json({
      success: true,
      data,
      token: {
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: "Your request could not be process. Please try again.",
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username)
      res.status(400).json({
        error: "You must enter your username.",
      });

    if (!password)
      res.status(400).json({
        error: "You must enter a password.",
      });

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({
        error:
          "The username you entered isn't connected to an account. Find your account and log in.",
      });
    }

    const decryptPassword = CryptoJS.AES.decrypt(
      existingUser.password,
      process.env.SECRET_PASSWORD_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (decryptPassword !== password) {
      return res.status(401).json({
        error: "Wrong credentials.",
      });
    }

    const accessToken = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_ACCESS_TOKEN,
      {
        expiresIn: "3d",
      }
    );

    const refreshToken = jwt.sign(
      {
        id: decryptPassword._id,
      },
      process.env.SECRET_REFRESH_TOKEN
    );

    const data = omit(existingUser.toJSON(), [
      "password",
      "createdAt",
      "updatedAt",
    ]);

    res.status(200).json({
      success: true,
      data,
      token: {
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: "Your request could not be process. Please try again.",
    });
  }
};

module.exports = {
  register,
  login,
};
