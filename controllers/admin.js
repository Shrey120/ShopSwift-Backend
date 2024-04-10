const Users = require("../models/user");
const Products = require("../models/product");
const Orders = require("../models/orders");

const getUsers = async (req, res) => {
  try {
    const users = await Users.find({}, { password: 0 });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    } else {
      return res.status(200).json({ success: true, users: users });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// delete user from database
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    await Users.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Users.findOne({ _id: id }, { password: 0 });
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;
    const updatedData = await Users.updateOne(
      { _id: id },
      {
        $set: updatedUserData,
      }
    );
    return res.status(200).json({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// Delete Products
const deleteProducts = async (req, res) => {
  try {
    const id = req.params.id;

    await Products.deleteOne({ id: id });
    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// Update Products
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProductData = req.body;
    const updatedData = await Products.updateOne(
      { _id: id },
      {
        $set: updatedProductData,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Products.findOne({ _id: id });
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
// Creating new Product
const createProduct = (req, res) => {
  try {
    const {
      name,
      company,
      price,
      colors,
      image,
      description,
      category,
      stock,
      stars,
      reviews,
      featured,
    } = req.body;
    Products.create({
      name,
      company,
      price,
      colors,
      image,
      description,
      category,
      stock,
      reviews,
      stars,
      featured,
    });
    return res
      .status(200)
      .json({ success: true, message: "Product Created Successfully" });
  } catch {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Orders.find();

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Orders found" });
    } else {
      return res.status(200).json({ success: true, orders: orders });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
};

//Update Orders
const updateOrders = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedOrderData = req.body;
    const updatedData = await Orders.updateOne(
      { _id: id },
      {
        $set: updatedOrderData,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Order Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  updateUser,
  getSingleUser,
  deleteProducts,
  updateProduct,
  getSingleProduct,
  createProduct,
  getOrders,
  updateOrders,
};
