const Products = require("../models/product");
const SingleProduct = require("../models/singleproduct");
const ContactUS = require("../models/contact");

require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY);
const Orders = require("../models/orders");

const fetchAllProducts = (req, res) => {
  Products.find()
    .then((products) =>
      res.status(200).json({ success: true, products: products })
    )
    .catch((err) =>
      res.status(500).json({ success: false, message: err.message })
    );
};

const fetchSingleProduct = (req, res) => {
  // const ProductID = req.params.id;
  SingleProduct.find()
    .then((product) =>
      res.status(200).json({ success: true, product: product })
    )
    .catch((err) =>
      res.status(500).json({ success: false, message: err.message })
    );
};

const contactDetails = async (req, res) => {
  try {
    const { name, email, query } = req.body;

    const contactData = await ContactUS.create({
      name,
      email,
      query,
    });

    res.status(200).json({
      success: true,
      data: contactData,
      message: "Query Send",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "internal error",
    });
  }
};

const orderCartProducts = async (req, res) => {
  const cartItems = req.body;
  const product = cartItems.products;

  const lineItems = product.map((cartItem) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: cartItem.name,
      },
      unit_amount: cartItem.price,
    },
    quantity: cartItem.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: [
        "ID",
        "IE",
        "IL",
        "IM",
        "IN",
        "IO",
        "IQ",
        "IS",
        "IT",
        "JE",
        "JM",
        "JO",
        "JP",
        "KE",
        "KG",
        "KH",
        "KI",
        "KM",
        "KN",
        "KR",
        "KW",
        "KY",
        "KZ",
        "LA",
        "LB",
        "LC",
        "LI",
        "LK",
        "LR",
        "LS",
        "LT",
        "LU",
        "LV",
        "LY",
        "MA",
        "MC",
        "MD",
        "ME",
        "MF",
        "MG",
        "MK",
        "ML",
        "MM",
        "MN",
        "MO",
        "MQ",
        "MR",
        "MS",
        "MT",
        "MU",
        "MV",
        "MW",
        "MX",
        "MY",
        "MZ",
        "NA",
        "NC",
        "NE",
        "NG",
        "NI",
        "NL",
        "NO",
        "NP",
        "NR",
        "NU",
        "NZ",
        "OM",
        "PA",
        "PE",
        "PF",
        "PG",
        "PH",
        "PK",
        "PL",
        "PM",
        "PN",
        "PR",
        "PS",
        "PT",
        "PY",
        "QA",
        "RE",
        "RO",
        "RS",
        "RU",
        "RW",
        "SA",
        "SB",
        "SC",
        "SE",
        "SG",
        "SH",
        "SI",
        "SJ",
        "SK",
        "SL",
        "SM",
        "SN",
        "SO",
        "SR",
        "SS",
        "ST",
        "SV",
        "SX",
        "SZ",
        "TA",
        "TC",
        "TD",
        "TF",
        "TG",
        "TH",
        "TJ",
        "TK",
        "TL",
        "TM",
        "TN",
        "TO",
        "TR",
        "TT",
        "TV",
        "TW",
        "TZ",
        "UA",
        "UG",
        "US",
      ],
    },
    custom_text: {
      shipping_address: {
        message: "Your Order will be delievered in 2 working-days",
      },
      submit: {
        message: "We'll email you instructions on how to get started.",
      },
    },
    success_url: "https://shop-swift.netlify.app/",
    cancel_url: "https://shop-swift.netlify.app/",
  });
  res.status(200).json({ id: session.id });
};

const storeOrders = (req, res) => {
  const { cartItems, sessionId } = req.body;
  let transaction = new Orders({
    cartItems,
    user: req.user.id,
    sessionId,
  });

  transaction
    .save()
    .then((result) =>
      res
        .status(200)
        .json({ success: true, message: "Order Added Successfully" })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: err.message,
      })
    );
};

const getOrders = (req, res) => {
  Orders.find({ user: req.user.id })
    .then((items) =>
      res.status(200).json({ success: true, orderedItems: items })
    )
    .catch((err) =>
      res.status(500).json({ success: false, message: err.message })
    );
};

module.exports = {
  fetchAllProducts,
  fetchSingleProduct,
  orderCartProducts,
  storeOrders,
  getOrders,
  contactDetails,
};
