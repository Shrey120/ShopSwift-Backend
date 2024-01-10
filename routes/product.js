const router = require("express").Router();

const {
  fetchAllProducts,
  fetchSingleProduct,
  orderCartProducts,
  storeOrders,
  contactDetails,
  getOrders,
} = require("../controllers/product");

const { isLoggedIn } = require("../middleware/authenticate");

router.get("/products", fetchAllProducts);

router.get("/products/:id", fetchSingleProduct);

router.post("/cart/create-checkout", orderCartProducts);

router.post("/contact", contactDetails);

router.post("/storeOrders", isLoggedIn, storeOrders);

router.get("/orders", isLoggedIn, getOrders);

module.exports = router;
