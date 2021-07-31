const express = require("express");
const app = express();

const login = require("./routes/login");
const register = require("./routes/register");
const users = require("./routes/users");
const verifyUser = require("./routes/verifyUser");

const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

mongoose.connect(
    process.env.DB_KEY,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log(mongoose.connection.readyState);
        console.log("Connected to DB");
    }
);

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Hello World...");
// });

app.use("/api/login", login);
app.use("/api/register", register);
app.use("/api/user", users);
app.use("/api/verifyUser", verifyUser);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
});
