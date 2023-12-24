const router = require("express").Router();

const {
  fetchAllProducts,
  fetchSingleProduct,
  orderCartProducts,
  storeOrders,
  getOrders,
} = require("../controllers/product");

const { isLoggedIn } = require("../middleware/authenticate");

router.get("/products", fetchAllProducts);

router.get("/products/:id", fetchSingleProduct);

router.post("/cart/create-checkout", orderCartProducts);

router.post("/storeOrders", isLoggedIn, storeOrders);

router.get("/orders", isLoggedIn, getOrders);
module.exports = router;
