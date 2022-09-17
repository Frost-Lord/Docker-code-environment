const mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({
    name: { type: String },
    password: { type: String },
    email: { type: String },
    registeredAt: { type: Number, default: Date.now() },
 }));