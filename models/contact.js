const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  query: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("contactUS", userModel);
