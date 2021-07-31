const express = require("express");
const User = require("../models/User");
const Router = express.Router();
const verify = require("../verifyToken");

Router.get("/", (req, res) => {
    res.send(`We are at \"${req.originalUrl}\"`);
});

Router.get("/getUserFavorites", verify, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        return res.status(200).json(user.favorites);
    } catch (err) {
        return res.status(400).json({
            msg: err,
        });
    }
});

Router.post("/addUserFavorites", verify, async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            {
                $push: { favorites: req.body },
            }
        );
        return res.status(200).json({
            msg: "added successfully",
        });
    } catch (err) {
        return res.status(400).json({
            msg: err,
        });
    }
});

Router.post("/removeUserFavorites", verify, async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            {
                $pull: { favorites: { imdbID: req.body.imdbID } },
            }
        );
        return res.status(200).json({
            msg: "removed successfully",
        });
    } catch (err) {
        return res.status(400).json({
            msg: err,
        });
    }
});

module.exports = Router;
