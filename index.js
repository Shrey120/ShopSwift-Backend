const express = require("express");
const cors = require("cors");
const app = express();

const route = require("./routes/auth");
const router = require("./routes/product");
const adminRoute = require("./routes/admin");

const dbConnect = require("./config/database");

app.use(cors());
app.use(express.json());

require("dotenv").config();

app.use(route);
app.use(router);
app.use("/admin", adminRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server listen on port ${process.env.PORT}`);
});
dbConnect();
