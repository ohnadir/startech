const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config");
const cookieParser = require("cookie-parser")
const app = express();
// config dot env file
dotenv.config();

//database call
connectDb();

app.use(express.json());
app.use(cookieParser());
app.use("*", cors({
  origin:true,
  credentials : true
}));

app.use(morgan("dev"));

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});



// all routes
const userRoute = require("./routes/users");
const productRoute = require("./routes/products");  
const orderRoute = require("./routes/orders");
const paymentRoute = require("./routes/payments");

// user route 
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/payments", paymentRoute);


//port
const PORT =  process.env.PORT;
const HOST = process.env.HOST;

app.get('/', (req, res) => {
  res.send('StarTech server Testing connection')
})

//listen server
app.listen(PORT, HOST, () => {
  console.log(`Server started on ${HOST}:${PORT}, url http://${HOST}:${PORT}`);
});