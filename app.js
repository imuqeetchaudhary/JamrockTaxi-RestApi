const express = require("express");
const bodyParser = require("body-parser");
const dbConnect = require("./db/connection");
const user = require("./routes/user");
const vehicle = require("./routes/vehicle");
const extras = require("./routes/extras");
const booking = require("./routes/booking");
const cors = require("cors");

dbConnect();
const app = express();

app.use(express.static(__dirname + "/upload"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.json({ message: "Jamrock Taxi Rest Api" });
});

app.use("/user", user);
app.use("/vehicle", vehicle);
app.use("/extras", extras);
app.use("/booking", booking);

module.exports = { app };
