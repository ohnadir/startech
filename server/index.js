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
app.use(cors({
  origin: "http://localhost:3000",
  credentials : true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(morgan("dev"));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
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