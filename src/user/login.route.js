const express = require("express");
const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express.Router();

app.post("/", async (req, res) => {
  const {email, password} = req.body;
  try {
    if (!email || !password) {
      res.send("Enter Valid Credentials");
    }
    const existUser = await User.findOne({email});
    if (!existUser) {
      return res.send("Incorrect Email");
    }
    bcrypt.compare(password, existUser.password, function (err, result) {
      if (err) {
        res.send("Somthing went wrong");
      }
      if (result) {
        const token = jwt.sign(
          {
            email,
            password,
          },
          "SECRET",
          {expiresIn: "7 days"}
        );
        return res.send({token});
      } else {
        return res.send(hash);
      }
    });
  } catch (e) {
    res.status(404).send(e.message);
  }
});

app.get("/get", async (req, res) => {
  const users = await User.find();
  res.send(users);
});
module.exports = app;
