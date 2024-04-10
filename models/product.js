const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  image: [
    {
      url: { type: String, required: true },
    },
  ],

  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  reviews: {
    type: Number,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("product", productSchema);
