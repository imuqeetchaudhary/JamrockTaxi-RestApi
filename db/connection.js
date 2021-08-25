const mongoose = require("mongoose");

const DEV_MONGO_URI = "mongodb://localhost:27017/taxi-booking-app";
const PROD_MONGO_URI =
  "mongodb+srv://muqeet_chaudhary:Abdul6890060@cluster0.bqu75.mongodb.net/Jamrock-Taxi";

const MONGO_URI =
  process.env.NODE_ENV === "production" ? PROD_MONGO_URI : PROD_MONGO_URI;

module.exports = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Successfully connected to db ..");
  } catch (err) {
    console.log("Some errors while connecting to db ...", err);
  }
};
