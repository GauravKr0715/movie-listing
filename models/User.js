const mongoose = require("mongoose");

// const Articles = new mongoose.Schema({
//     ID: {
//         type: Number,
//         required: true
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     assignedDate: {
//         type: Date,
//         default: Date.now()
//     },
//     dueDate: {
//         type: Date
//     },
//     status: {
//         type: String
//     },
//     description: {
//         type: String
//     },
//     refLinks: [String],
//     path: {
//         type: String
//     }
// });

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    favorites: [
        {
            Title: String,
            Year: String,
            imdbID: String,
            Type: String,
            Poster: String,
        },
    ],
});

module.exports = mongoose.model("user", userSchema);
