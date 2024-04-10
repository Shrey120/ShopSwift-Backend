const router = require("express").Router();

const {
  fetchAllProducts,
  orderCartProducts,
  storeOrders,
  contactDetails,
  getOrders,
  deleteOrders,
} = require("../controllers/product");

const { isLoggedIn } = require("../middleware/authenticate");

router.get("/products", fetchAllProducts);

router.post("/cart/create-checkout", orderCartProducts);

router.post("/contact", contactDetails);

router.post("/storeOrders", isLoggedIn, storeOrders);

router.get("/orders", isLoggedIn, getOrders);

router.delete("/orders/delete", isLoggedIn, deleteOrders);
module.exports = router;
