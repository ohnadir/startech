const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config");
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// config dot env file
dotenv.config();

//database call
connectDb();
const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors());

// all routes
const userRoute = require("./routes/usersRoute");
const productRoute = require("./routes/productsRoute");  
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");
const errorMiddleware = require('./middleware/errors')  

// user route 
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/payments", paymentRoute);
// Middleware to handle errors
app.use(errorMiddleware);

//port
const PORT =  process.env.PORT;
const HOST = process.env.HOST
app.get('/', (req, res) => {
  res.send('Star tech Testing connection')
})
//listen server
app.listen(PORT, HOST, () => {
  console.log(`Server started on ${HOST}:${PORT}, url http://${HOST}:${PORT}`);
});