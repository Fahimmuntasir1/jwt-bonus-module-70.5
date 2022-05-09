const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is running");
});

app.post("/login", (req, res) => {
  const user = req.body; //Attention : this is used for learning purpose only do not use this system to store email password for serious application
  console.log(user);

  if (user.password === "123456") {
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.send({
      success: true,
      accessToken: accessToken,
    });
  } else {
    res.send({ success: false });
  }
});

app.get("/orders", (req, res) => {
  console.log(req.headers.authorization);
  res.send([
    { id: 1, products: "sunglass", price: 799 },
    { id: 2, products: "t-shirt", price: 669 },
  ]);
});

app.listen(port, () => {
  console.log("listening to port", port);
});
