const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { registerValidation } = require("../validation");
const Router = express.Router();

Router.get("/", (req, res) => {
    res.send(`We are at \"${req.originalUrl}\"`);
});

//Register a new account
Router.post("/", async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error)
        return res.status(406).json({ message: error.details[0].message });

    const sameEmail = await User.findOne({ email: req.body.email });
    if (sameEmail)
        return res.status(400).json({
            message: "Email already exists...",
        });

    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        favorites: [],
    });

    try {
        const registeredUser = await user.save();
        res.json(registeredUser);
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
});

module.exports = Router;
