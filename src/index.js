require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./db/connection");
const authRouter = require("./routes/auth");
const itemRouter = require("./routes/item");

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/auth", authRouter);
app.use("/item", itemRouter);

app.get("/", (req, res) => {
  res.send({
    message: "Thanks for sending that request",
  });
});

app.listen(3000, () => {
  console.log(`Server started on ${port}`);
});
