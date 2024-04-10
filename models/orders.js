const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cartItems: [],
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  sessionId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Ordered",
  },
});

module.exports = mongoose.model("orders", orderSchema);
