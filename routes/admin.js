const express = require("express");
const adminRoute = require("express").Router();

const {
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
} = require("../controllers/admin");

const { isLoggedIn, isAdmin } = require("../middleware/authenticate");

// Admin user
adminRoute.get("/users", isLoggedIn, isAdmin, getUsers);
adminRoute.delete("/users/delete/:id", isLoggedIn, isAdmin, deleteUser);
adminRoute.patch("/users/update/:id", isLoggedIn, isAdmin, updateUser);
adminRoute.get("/users/:id", getSingleUser);

// Admin Products
adminRoute.get("/products/:id", getSingleProduct);
adminRoute.delete("/products/delete/:id", isLoggedIn, isAdmin, deleteProducts);
adminRoute.patch("/products/update/:id", isLoggedIn, isAdmin, updateProduct);
adminRoute.post("/products/new", createProduct);

adminRoute.get("/orders", isLoggedIn, isAdmin, getOrders);
adminRoute.patch("/orders/:id", isLoggedIn, isAdmin, updateOrders);

module.exports = adminRoute;
