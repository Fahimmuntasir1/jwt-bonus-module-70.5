const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Forbidden" });
    }
    req.decoded = decoded;
    next();
  });
};

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
      { expiresIn: "5s" }
    );

    res.send({
      success: true,
      accessToken: accessToken,
    });
  } else {
    res.send({ success: false });
  }
});

app.get("/orders", verifyJwt, (req, res) => {
  console.log(req.headers.authorization);
  res.send([
    { id: 1, products: "sunglass", price: 799 },
    { id: 2, products: "t-shirt", price: 669 },
  ]);
});

app.listen(port, () => {
  console.log("listening to port", port);
});
