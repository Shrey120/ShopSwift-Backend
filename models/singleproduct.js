const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  company: { type: String, required: true },
  price: { type: Number, required: true },
  colors: { type: [String], required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  reviews: { type: Number, required: true },
  stars: { type: Number, required: true },
  image: [
    {
      id: { type: String, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      url: { type: String, required: true },
      filename: { type: String, required: true },
      size: { type: Number, required: true },
      type: { type: String, required: true },
    },
  ],
});

const Product = mongoose.model("singleProduct", productSchema);

module.exports = Product;
