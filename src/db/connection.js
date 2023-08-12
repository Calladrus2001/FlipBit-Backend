require("dotenv").config();
const mongoose = require("mongoose");

const db = process.env.DBURI || "mongodb://127.0.0.1:27017/FlipBit";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(`Failed to connect to MongoDB: ${err}`);
  });
