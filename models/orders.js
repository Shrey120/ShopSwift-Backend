const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cartItems: [],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  sessionId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("orders", orderSchema);
