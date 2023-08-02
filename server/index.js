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
  origin: "https://startech-nu.vercel.app",
  credentials : true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(morgan("dev"));


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