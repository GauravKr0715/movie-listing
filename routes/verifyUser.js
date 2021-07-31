const express = require("express");
const Router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

Router.get("/", async (req, res) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({});

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const { _id, username, email } = await User.findById(
      verified._id
    );
    return res.status(200).json({
      _id,
      username,
      email
    });
  } catch (err) {
    return res.status(403).json({ message: err });
  }
});

module.exports = Router;
