const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const connectDb = require("./config");

// config dot env file
dotenv.config();

//database call
connectDb();
const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// all routes
const userRoute = require("./routes/orderRoute");
const productRoute = require("./routes/productsRoute");  
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute")  

// user route 
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/payments", paymentRoute);

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//port
const PORT = 8080 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});