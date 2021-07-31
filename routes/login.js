const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { loginValidation } = require("../validation.js");
const Router = express.Router();

Router.get("/", (req, res) => {
    res.send(`We are at \"${req.originalUrl}\"`);
});

//Login to already existing account
Router.post("/", async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(401).json({ message: "Email doesn't exist.." });

    const passCheck = await bcrypt.compare(req.body.password, user.password);
    if (!passCheck)
        return res.status(401).json({ message: "Password is Invalid" });

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token)
        .status(200)
        .json({ message: "Login Successful!!", token: token });
});

module.exports = Router;
