const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL);
    console.log(`Server Running On ${mongoose.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;