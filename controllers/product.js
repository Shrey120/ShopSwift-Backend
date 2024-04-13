const Products = require("../models/product");
const ContactUS = require("../models/contact");
const Orders = require("../models/orders");

require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY);

const fetchAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    return res.status(200).json({ success: true, products: products });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
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
    return res.status(500).json({
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
    billing_address_collection: "required",
    custom_text: {
      shipping_address: {
        message: "Your Order will be delievered in 2 working-days",
      },
      submit: {
        message: "We'll email you instructions on how to get started.",
      },
    },
    success_url: "https://shopswiftely.netlify.app",
    cancel_url: "https://shopswiftely.netlify.app/cart",
  });
  res.status(200).json({ id: session.id });
};

const storeOrders = async (req, res) => {
  try {
    const { cartItems, sessionId, name, email, city, formattedDate } = req.body;
    let transaction = await new Orders({
      cartItems,
      userName: name,
      userEmail: email,
      city: city,
      date: formattedDate,
      user: req.user.id,
      sessionId,
    });
    const result = transaction.save();
    return res
      .status(200)
      .json({ success: true, message: "Order Added Successfully" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const items = await Orders.find({ user: req.user.id });
    return res.status(200).json({ success: true, orderedItems: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteOrders = async (req, res) => {
  try {
    const { id } = req.body;
    // Update the cart in the database to remove the specified item
    await Orders.findOneAndUpdate(
      { "cartItems.id": id },
      { $pull: { cartItems: { id: id } } }
    );

    res
      .status(200)
      .json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  fetchAllProducts,
  orderCartProducts,
  storeOrders,
  getOrders,
  contactDetails,
  deleteOrders,
};
