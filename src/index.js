const express = require('express');

const db = require("./db/connection");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(
    {
      "message": "Thanks for sending that request"
    }
  );
});

app.listen(3000, ()=>{
  console.log(`Server started on ${port}`);
});